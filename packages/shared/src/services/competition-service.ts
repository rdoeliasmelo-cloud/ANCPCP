import { buildLeaderboard } from "../lib/scoring";
import { db } from "./mock-store";

export const competitionService = {
  createEvent(input: { name: string; venue: string; date: string }) {
    const event = { id: `evt-${db.events.length + 1}`, status: "DRAFT" as const, ...input };
    db.events.push(event);
    return event;
  },

  createCategory(input: { eventId: string; name: string; order: number }) {
    const category = { id: `cat-${db.categories.length + 1}`, ...input };
    db.categories.push(category);
    return category;
  },

  registerParticipant(input: {
    categoryId: string;
    horseId: string;
    exhibitorId: string;
    entryNumber: number;
  }) {
    const participant = {
      id: `par-${db.participants.length + 1}`,
      status: "REGISTERED" as const,
      ...input
    };
    db.participants.push(participant);
    return participant;
  },

  saveScore(input: { roundId: string; participantId: string; judgeId: string; score: number; position?: number }) {
    const entry = {
      id: `scr-${db.scoreEntries.length + 1}`,
      createdAt: new Date().toISOString(),
      ...input
    };
    db.scoreEntries.push(entry);
    return entry;
  },

  recalculate(roundId: string) {
    const round = db.rounds.find((r) => r.id === roundId);
    if (!round) throw new Error("Round not found");

    const participants = db.participants.filter((participant) => participant.categoryId === round.categoryId);
    const rows = participants.map((participant) => {
      const horse = db.horses.find((h) => h.id === participant.horseId);
      const exhibitor = db.exhibitors.find((e) => e.id === participant.exhibitorId);
      return {
        participantId: participant.id,
        horseName: horse?.name ?? "N/A",
        exhibitorName: exhibitor?.name ?? "N/A",
        finalScore: 0,
        status: round.status
      };
    });

    const groupedScores = Object.groupBy(
      db.scoreEntries.filter((entry) => entry.roundId === roundId),
      (entry) => entry.participantId
    ) as Record<string, typeof db.scoreEntries>;

    const groupedPenalties = Object.groupBy(
      db.penalties.filter((penalty) => penalty.roundId === roundId),
      (penalty) => penalty.participantId
    ) as Record<string, typeof db.penalties>;

    return buildLeaderboard(rows, groupedScores, groupedPenalties, db.scoringRule);
  }
};
