import {
  Category,
  Event,
  Exhibitor,
  Horse,
  Participant,
  Penalty,
  Round,
  ScoreEntry,
  ScoringRuleConfig
} from "../types/domain";

const now = new Date().toISOString();

export const db = {
  events: [
    { id: "evt-1", name: "Concurso Nacional ANCPCP 2026", venue: "Lima", date: "2026-07-21", status: "ACTIVE" }
  ] as Event[],
  categories: [
    { id: "cat-1", eventId: "evt-1", name: "Potrancas de Bozal", order: 1 },
    { id: "cat-2", eventId: "evt-1", name: "Capones Montados", order: 2 }
  ] as Category[],
  rounds: [
    { id: "rnd-1", categoryId: "cat-1", name: "Clasificatoria", order: 1, status: "EVALUATED" },
    { id: "rnd-2", categoryId: "cat-1", name: "Final", order: 2, status: "IN_TRACK" }
  ] as Round[],
  exhibitors: [
    { id: "exh-1", name: "Hacienda Las Palmas" },
    { id: "exh-2", name: "Criadero El Paso" }
  ] as Exhibitor[],
  horses: [
    { id: "hor-1", name: "Lucero de Oro", breedingFarm: "Las Palmas", ownerName: "Ana Ruiz" },
    { id: "hor-2", name: "Reina Morena", breedingFarm: "El Paso", ownerName: "Carlos Vega" }
  ] as Horse[],
  participants: [
    { id: "par-1", categoryId: "cat-1", horseId: "hor-1", exhibitorId: "exh-1", entryNumber: 12, status: "IN_COMPETITION" },
    { id: "par-2", categoryId: "cat-1", horseId: "hor-2", exhibitorId: "exh-2", entryNumber: 14, status: "IN_COMPETITION" }
  ] as Participant[],
  scoringRule: {
    method: "DROP_HIGHEST_LOWEST",
    tiebreaker: "HIGHEST_SINGLE_SCORE",
    manualPenaltyEnabled: true
  } as ScoringRuleConfig,
  scoreEntries: [
    { id: "scr-1", roundId: "rnd-2", participantId: "par-1", judgeId: "judge-1", score: 91.2, createdAt: now },
    { id: "scr-2", roundId: "rnd-2", participantId: "par-1", judgeId: "judge-2", score: 92.0, createdAt: now },
    { id: "scr-3", roundId: "rnd-2", participantId: "par-2", judgeId: "judge-1", score: 90.5, createdAt: now },
    { id: "scr-4", roundId: "rnd-2", participantId: "par-2", judgeId: "judge-2", score: 91.1, createdAt: now }
  ] as ScoreEntry[],
  penalties: [] as Penalty[]
};
