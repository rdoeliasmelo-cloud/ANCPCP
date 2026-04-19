import { db } from "@ancpcp/shared";

export default function EventsPage() {
  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">Eventos</h1>
      <ul className="space-y-3">
        {db.events.map((event) => (
          <li key={event.id} className="rounded-lg border bg-white p-4">
            <p className="font-semibold">{event.name}</p>
            <p className="text-sm text-slate-600">{event.venue} · {event.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
