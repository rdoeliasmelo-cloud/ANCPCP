"use client";

import { useEffect, useState } from "react";

interface LeaderboardItem {
  participantId: string;
  horseName: string;
  exhibitorName: string;
  finalScore: number;
  rank: number;
  status: string;
}

export default function PublicLivePage() {
  const [rows, setRows] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/leaderboard?roundId=rnd-2");
      const data = await response.json();
      setRows(data.items ?? []);
    };

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">Resultados en vivo</h1>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.participantId} className="flex items-center justify-between rounded border bg-white p-3">
            <span>
              #{row.rank} · {row.horseName} · {row.exhibitorName}
            </span>
            <strong>{row.finalScore.toFixed(3)}</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}
