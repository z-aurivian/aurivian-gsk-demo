// Tiny client-side store for "insights pinned to the Insight Journey from
// NOVA". Backed by localStorage so it survives reloads, and dispatches a
// browser CustomEvent so the kanban can hot-update when an insight is
// pinned from elsewhere.

const KEY = 'aurivian.journey.pinned';
const EVENT = 'aurivian:journey-changed';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { ids } }));
  } catch {
    /* no-op */
  }
}

export function getPinnedIds() {
  return read();
}

export function isPinned(id) {
  return read().includes(id);
}

export function pinInsight(id) {
  const cur = read();
  if (!cur.includes(id)) write([...cur, id]);
}

export function unpinInsight(id) {
  write(read().filter(x => x !== id));
}

export function clearPinned() {
  write([]);
}

export function subscribePinned(cb) {
  const handler = () => cb(read());
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
