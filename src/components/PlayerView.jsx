import HlsPlayer from './HlsPlayer';

export default function PlayerView({ event, onBack }) {
  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="rounded-2xl border border-white/20 bg-white/[0.06] px-4 py-2 text-sm text-cyan-50 backdrop-blur-lg transition hover:border-white/40 hover:bg-white/15"
      >
        ← Volver a eventos
      </button>

      <div className="space-y-5 rounded-3xl border border-white/20 bg-white/[0.08] p-4 shadow-card backdrop-blur-xl sm:p-6">
        <HlsPlayer src={event.streamUrl} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {event.logo && (
            <img
              src={event.logo}
              alt={event.title}
              className="h-20 w-32 rounded-xl border border-white/20 object-cover"
              loading="lazy"
            />
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/80">Ahora reproduciendo</p>
            <h3 className="text-xl font-semibold text-white">{event.title}</h3>
            <p className="text-sm text-slate-300">Categoría: {event.category}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
