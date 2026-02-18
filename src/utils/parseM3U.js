/**
 * Parser simple para listas M3U estándar.
 * Extrae group-title (categoría), tvg-name o título visible, tvg-logo y URL del stream.
 */
export function parseM3U(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return [];
  }

  const lines = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const events = [];

  for (let i = 0; i < lines.length; i += 1) {
    const currentLine = lines[i];

    if (!currentLine.startsWith('#EXTINF:')) {
      continue;
    }

    const urlLine = lines[i + 1];
    if (!urlLine || urlLine.startsWith('#')) {
      continue;
    }

    const attrsPart = currentLine.split(',')[0];
    const fallbackTitle = currentLine.includes(',')
      ? currentLine.split(',').slice(1).join(',').trim()
      : 'Evento deportivo';

    const groupTitle = getAttr(attrsPart, 'group-title') || 'Sin categoría';
    const tvgName = getAttr(attrsPart, 'tvg-name') || fallbackTitle;
    const tvgLogo = getAttr(attrsPart, 'tvg-logo') || '';

    events.push({
      id: `${groupTitle}-${tvgName}-${i}`,
      category: groupTitle,
      title: tvgName,
      logo: tvgLogo,
      streamUrl: urlLine
    });
  }

  return events;
}

function getAttr(extinfLine, key) {
  const regex = new RegExp(`${key}="([^"]*)"`);
  const match = extinfLine.match(regex);
  return match?.[1]?.trim() || '';
}
