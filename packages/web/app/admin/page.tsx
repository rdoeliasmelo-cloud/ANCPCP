import { Card } from "@/components/card";
import { api } from "@/lib/api";

export default function AdminDashboardPage() {
  const data = api.listDashboard();

  return (
    <main className="grid gap-4 md:grid-cols-2">
      <Card title="Eventos activos">
        <p className="text-3xl font-bold">{data.activeEvents.length}</p>
      </Card>
      <Card title="Próximas rondas">
        <p className="text-3xl font-bold">{data.upcomingRounds.length}</p>
      </Card>
      <Card title="Pendientes de oficializar">
        <p className="text-3xl font-bold">{data.pendingOfficialResults.length}</p>
      </Card>
      <Card title="Participantes">
        <p className="text-3xl font-bold">{data.participantsCount}</p>
      </Card>
    </main>
  );
}
