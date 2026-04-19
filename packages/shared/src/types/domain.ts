export type RoleName =
  | "SUPER_ADMIN"
  | "ASSOCIATION_STAFF"
  | "JUDGE"
  | "EXHIBITOR"
  | "PUBLIC";

export type EventStatus = "DRAFT" | "PUBLISHED" | "ACTIVE" | "CLOSED";
export type RoundStatus = "PENDING" | "IN_TRACK" | "EVALUATED" | "OFFICIAL";
export type ParticipantStatus =
  | "REGISTERED"
  | "CONFIRMED"
  | "IN_COMPETITION"
  | "WITHDRAWN"
  | "DISQUALIFIED"
  | "FINISHED";

export type ScoringMethod =
  | "SIMPLE_AVERAGE"
  | "WEIGHTED_AVERAGE"
  | "DROP_HIGHEST_LOWEST"
  | "RANKING_BY_POSITION";

export interface UserSession {
  userId: string;
  role: RoleName;
  name: string;
}

export interface Event {
  id: string;
  name: string;
  venue: string;
  date: string;
  status: EventStatus;
}

export interface Category {
  id: string;
  eventId: string;
  name: string;
  order: number;
}

export interface Round {
  id: string;
  categoryId: string;
  name: string;
  order: number;
  status: RoundStatus;
}

export interface Exhibitor {
  id: string;
  name: string;
}

export interface Horse {
  id: string;
  name: string;
  breedingFarm?: string;
  ownerName?: string;
}

export interface Participant {
  id: string;
  categoryId: string;
  horseId: string;
  exhibitorId: string;
  entryNumber: number;
  status: ParticipantStatus;
}

export interface ScoreEntry {
  id: string;
  roundId: string;
  participantId: string;
  judgeId: string;
  score: number;
  position?: number;
  createdAt: string;
}

export interface Penalty {
  id: string;
  participantId: string;
  roundId: string;
  points: number;
  reason: string;
}

export interface ScoringRuleConfig {
  method: ScoringMethod;
  weightsByJudgeId?: Record<string, number>;
  tiebreaker: "HIGHEST_SINGLE_SCORE" | "LOWEST_PENALTY" | "LATEST_SCORE";
  manualPenaltyEnabled: boolean;
}

export interface LeaderboardRow {
  participantId: string;
  horseName: string;
  exhibitorName: string;
  finalScore: number;
  status: RoundStatus;
  rank: number;
}
