import { db } from "@ancpcp/shared";

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const event = db.events.find((item) => item.id === params.eventId) ?? db.events[0];
  const categories = db.categories.filter((category) => category.eventId === event.id);

  return (
    <main>
      <h1 className="text-2xl font-semibold">{event.name}</h1>
      <p className="mb-4 text-slate-600">{event.venue} · {event.date}</p>
      <h2 className="mb-2 text-lg font-semibold">Categorías</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li className="rounded border bg-white p-3" key={category.id}>{category.name}</li>
        ))}
      </ul>
    </main>
  );
}
