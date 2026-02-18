export default function GlassCard({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-5 text-left shadow-card backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/40 hover:bg-white/[0.14] hover:shadow-glow ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-8 -top-8 h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl" />
      </div>
      {children}
    </button>
  );
}
