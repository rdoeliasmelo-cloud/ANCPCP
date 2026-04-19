import { competitionService, db } from "@ancpcp/shared";

export const api = {
  listDashboard() {
    return {
      activeEvents: db.events.filter((event) => event.status === "ACTIVE" || event.status === "PUBLISHED"),
      upcomingRounds: db.rounds.filter((round) => round.status === "PENDING" || round.status === "IN_TRACK"),
      pendingOfficialResults: db.rounds.filter((round) => round.status === "EVALUATED"),
      participantsCount: db.participants.length
    };
  },
  leaderboard(roundId: string) {
    return competitionService.recalculate(roundId);
  }
};
