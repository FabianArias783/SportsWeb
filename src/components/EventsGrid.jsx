import EventCard from './EventCard';

export default function EventsGrid({ category, events, onBack, onSelectEvent }) {
  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="rounded-2xl border border-white/20 bg-white/[0.06] px-4 py-2 text-sm text-cyan-50 backdrop-blur-lg transition hover:border-white/40 hover:bg-white/15"
      >
        ← Volver a categorías
      </button>

      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/80">Categoría seleccionada</p>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{category}</h2>
        <p className="text-sm text-slate-300">{events.length} eventos encontrados en esta categoría.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onOpen={onSelectEvent} />
        ))}
      </div>
    </section>
  );
}
