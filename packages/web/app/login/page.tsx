export default function LoginPage() {
  return (
    <main className="mx-auto mt-16 max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold">Ingreso ANCPCP</h1>
      <p className="mb-4 text-sm text-slate-600">MVP con autenticación mock por roles.</p>
      <div className="space-y-3">
        <input className="w-full rounded border p-2" placeholder="correo@ancpcp.pe" />
        <input className="w-full rounded border p-2" type="password" placeholder="••••••••" />
        <button className="w-full rounded bg-brand-500 px-4 py-2 font-medium text-white">Entrar</button>
      </div>
    </main>
  );
}
