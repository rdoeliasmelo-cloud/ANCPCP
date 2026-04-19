import { db } from "@ancpcp/shared";

export default function ParticipantsPage() {
  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">Participantes</h1>
      <table className="w-full rounded-lg border bg-white text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-2">N°</th>
            <th className="p-2">Caballo</th>
            <th className="p-2">Expositor</th>
            <th className="p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {db.participants.map((participant) => (
            <tr key={participant.id} className="border-t">
              <td className="p-2">{participant.entryNumber}</td>
              <td className="p-2">{db.horses.find((horse) => horse.id === participant.horseId)?.name}</td>
              <td className="p-2">{db.exhibitors.find((ex) => ex.id === participant.exhibitorId)?.name}</td>
              <td className="p-2">{participant.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
