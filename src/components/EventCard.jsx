import GlassCard from './GlassCard';

export default function EventCard({ event, onOpen }) {
  return (
    <GlassCard onClick={() => onOpen(event)} className="overflow-hidden p-0">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-800/50">
        {event.logo ? (
          <img
            src={event.logo}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-300">Sin imagen</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-black/30 px-2.5 py-1 text-[11px] text-slate-100 backdrop-blur-sm">
          LIVE
        </div>
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/80">{event.category}</p>
        <h3 className="line-clamp-2 text-sm font-semibold text-white sm:text-base">{event.title}</h3>
      </div>
    </GlassCard>
  );
}
