import { db } from "@ancpcp/shared";

export default function CategoriesRoundsPage() {
  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">Categorías y rondas</h1>
      <div className="space-y-4">
        {db.categories.map((category) => (
          <section key={category.id} className="rounded-xl border bg-white p-4">
            <h2 className="font-semibold">{category.name}</h2>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-700">
              {db.rounds
                .filter((round) => round.categoryId === category.id)
                .map((round) => (
                  <li key={round.id}>
                    {round.name} ({round.status})
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
