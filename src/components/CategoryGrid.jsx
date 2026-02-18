import GlassCard from './GlassCard';

export default function CategoryGrid({ categories, onSelectCategory }) {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/80">Apple Glass Sports</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
          Explora tus deportes favoritos
        </h1>
        <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
          Descubre una experiencia premium: categorías dinámicas extraídas del M3U, diseño cristalino y reproducción en vivo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <GlassCard
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className="min-h-40"
          >
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-cyan-100/90">
                {category.count} en vivo
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white sm:text-xl">{category.name}</h2>
                <p className="mt-1 text-sm text-slate-300">Ver programación deportiva</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
