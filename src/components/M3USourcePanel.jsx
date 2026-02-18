import { useRef, useState } from 'react';

export default function M3USourcePanel({ onApplyText, onResetExample }) {
  const [draft, setDraft] = useState('');
  const fileRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setDraft(text);
    onApplyText(text);
  };

  return (
    <section className="space-y-3 rounded-3xl border border-white/15 bg-white/[0.05] p-4 backdrop-blur-lg">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Cargar lista M3U</h2>
          <p className="text-xs text-slate-300">Sube tu archivo .m3u/.m3u8 o pega el contenido manualmente.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-xl border border-white/20 bg-white/[0.08] px-3 py-2 text-xs text-cyan-50 transition hover:bg-white/[0.16]"
          >
            Subir archivo M3U
          </button>
          <button
            type="button"
            onClick={onResetExample}
            className="rounded-xl border border-white/20 bg-white/[0.08] px-3 py-2 text-xs text-cyan-50 transition hover:bg-white/[0.16]"
          >
            Restaurar ejemplo
          </button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".m3u,.m3u8,text/plain"
        onChange={handleFileUpload}
        className="hidden"
      />

      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Pega aquí tu contenido M3U completo (#EXTM3U, #EXTINF..., URL...)."
        className="h-36 w-full rounded-2xl border border-white/20 bg-black/30 p-3 text-xs text-slate-100 placeholder:text-slate-400 focus:border-cyan-300/70 focus:outline-none"
      />

      <button
        type="button"
        onClick={() => onApplyText(draft)}
        className="rounded-xl border border-cyan-200/40 bg-cyan-400/15 px-4 py-2 text-xs font-medium text-cyan-50 transition hover:bg-cyan-300/25"
      >
        Aplicar texto M3U pegado
      </button>
    </section>
  );
}
