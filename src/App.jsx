import { useMemo, useState } from 'react';
import CategoryGrid from './components/CategoryGrid';
import EventsGrid from './components/EventsGrid';
import PlayerView from './components/PlayerView';
import M3USourcePanel from './components/M3USourcePanel';
import { m3uRawText } from './data/m3uSource';
import { parseM3U } from './utils/parseM3U';

const VIEWS = {
  CATEGORIES: 'categories',
  EVENTS: 'events',
  PLAYER: 'player'
};

export default function App() {
  const [m3uText, setM3uText] = useState(m3uRawText);
  const events = useMemo(() => parseM3U(m3uText), [m3uText]);
  const events = useMemo(() => parseM3U(m3uRawText), []);
  const categories = useMemo(() => {
    const countByCategory = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countByCategory)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [events]);

  const [view, setView] = useState(VIEWS.CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsByCategory = useMemo(
    () => events.filter((event) => event.category === selectedCategory),
    [events, selectedCategory]
  );


  const applyM3UText = (text) => {
    setM3uText(text || '');
    setSelectedCategory('');
    setSelectedEvent(null);
    setView(VIEWS.CATEGORIES);
  };

  const resetExampleM3U = () => {
    applyM3UText(m3uRawText);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setView(VIEWS.EVENTS);
  };

  const handleOpenEvent = (event) => {
    setSelectedEvent(event);
    setView(VIEWS.PLAYER);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-blue-500/25 blur-[100px]" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-400/15 blur-[110px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-6 rounded-[2rem] border border-white/15 bg-black/20 p-4 backdrop-blur-xl sm:p-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-lg sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/75">Sports Streaming Platform</p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">SportsWeb Vision Pro</h1>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center sm:w-auto">
            <div className="rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3">
              <p className="text-xl font-semibold text-white">{categories.length}</p>
              <p className="text-xs uppercase tracking-widest text-slate-300">Categorías</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3">
              <p className="text-xl font-semibold text-white">{events.length}</p>
              <p className="text-xs uppercase tracking-widest text-slate-300">Eventos</p>
            </div>
          </div>
        </header>

        <M3USourcePanel onApplyText={applyM3UText} onResetExample={resetExampleM3U} />

        {events.length === 0 && (
          <div className="rounded-2xl border border-amber-200/30 bg-amber-300/10 p-4 text-sm text-amber-100">
            No se detectaron eventos. Verifica que el texto tenga bloques <code>#EXTINF</code> y la URL de stream en la línea siguiente.
          </div>
        )}

        {view === VIEWS.CATEGORIES && (
          <CategoryGrid categories={categories} onSelectCategory={handleSelectCategory} />
        )}

        {view === VIEWS.EVENTS && (
          <EventsGrid
            category={selectedCategory}
            events={eventsByCategory}
            onBack={() => setView(VIEWS.CATEGORIES)}
            onSelectEvent={handleOpenEvent}
          />
        )}

        {view === VIEWS.PLAYER && selectedEvent && (
          <PlayerView event={selectedEvent} onBack={() => setView(VIEWS.EVENTS)} />
        )}
      </div>
    </main>
  );
}
