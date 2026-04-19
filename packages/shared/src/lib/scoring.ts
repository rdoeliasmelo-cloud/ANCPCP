import { LeaderboardRow, Penalty, ScoreEntry, ScoringRuleConfig } from "../types/domain";

const average = (values: number[]) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

function weightedAverage(scores: ScoreEntry[], weightsByJudgeId: Record<string, number>) {
  const weighted = scores.reduce(
    (acc, entry) => {
      const weight = weightsByJudgeId[entry.judgeId] ?? 1;
      acc.totalWeight += weight;
      acc.totalScore += entry.score * weight;
      return acc;
    },
    { totalWeight: 0, totalScore: 0 }
  );

  return weighted.totalWeight ? weighted.totalScore / weighted.totalWeight : 0;
}

function dropHighestLowest(scores: ScoreEntry[]) {
  if (scores.length <= 2) return average(scores.map((s) => s.score));
  const sorted = [...scores].sort((a, b) => a.score - b.score);
  return average(sorted.slice(1, -1).map((s) => s.score));
}

function rankByPosition(scores: ScoreEntry[]) {
  const positions = scores.map((score) => score.position ?? 99);
  return -average(positions);
}

export function calculateParticipantScore(
  scores: ScoreEntry[],
  penalties: Penalty[],
  config: ScoringRuleConfig
) {
  const baseScore = (() => {
    switch (config.method) {
      case "WEIGHTED_AVERAGE":
        return weightedAverage(scores, config.weightsByJudgeId ?? {});
      case "DROP_HIGHEST_LOWEST":
        return dropHighestLowest(scores);
      case "RANKING_BY_POSITION":
        return rankByPosition(scores);
      case "SIMPLE_AVERAGE":
      default:
        return average(scores.map((s) => s.score));
    }
  })();

  const penaltyPoints = config.manualPenaltyEnabled
    ? penalties.reduce((sum, penalty) => sum + penalty.points, 0)
    : 0;

  return Number((baseScore - penaltyPoints).toFixed(3));
}

export function buildLeaderboard(
  rows: Omit<LeaderboardRow, "rank">[],
  allScores: Record<string, ScoreEntry[]>,
  allPenalties: Record<string, Penalty[]>,
  config: ScoringRuleConfig
): LeaderboardRow[] {
  const scored = rows.map((row) => ({
    ...row,
    finalScore: calculateParticipantScore(
      allScores[row.participantId] ?? [],
      allPenalties[row.participantId] ?? [],
      config
    )
  }));

  scored.sort((a, b) => {
    if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
    if (config.tiebreaker === "LOWEST_PENALTY") {
      const aPenalty = (allPenalties[a.participantId] ?? []).reduce((sum, p) => sum + p.points, 0);
      const bPenalty = (allPenalties[b.participantId] ?? []).reduce((sum, p) => sum + p.points, 0);
      return aPenalty - bPenalty;
    }
    if (config.tiebreaker === "LATEST_SCORE") {
      const aLast = (allScores[a.participantId] ?? []).at(-1)?.createdAt ?? "";
      const bLast = (allScores[b.participantId] ?? []).at(-1)?.createdAt ?? "";
      return aLast > bLast ? -1 : 1;
    }
    const aHighest = Math.max(...(allScores[a.participantId] ?? []).map((s) => s.score), 0);
    const bHighest = Math.max(...(allScores[b.participantId] ?? []).map((s) => s.score), 0);
    return bHighest - aHighest;
  });

  return scored.map((row, index) => ({ ...row, rank: index + 1 }));
}
