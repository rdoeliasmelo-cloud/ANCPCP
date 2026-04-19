import Link from "next/link";

const links = [
  ["/admin", "Dashboard"],
  ["/admin/events", "Eventos"],
  ["/admin/categories-rounds", "Categorías y rondas"],
  ["/admin/participants", "Participantes"],
  ["/public/live", "En vivo"],
  ["/public/history", "Histórico"]
];

export function Navbar() {
  return (
    <nav className="mb-6 rounded-xl bg-brand-700 px-4 py-3 text-white">
      <ul className="flex flex-wrap gap-4 text-sm">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link className="hover:underline" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
