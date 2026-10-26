const LAST_RUN_KEY = 'rhode-mini-bag-last-run'

// Persisted separately from React state so the Ranking screen still knows
// who just finished and with what score even after a full page reload
// (which would otherwise reset playerName/totalScore back to their defaults).
export function saveLastRun(name, score, bagId) {
  try {
    localStorage.setItem(LAST_RUN_KEY, JSON.stringify({ name, score, bagId }))
  } catch {
    // localStorage unavailable (private mode, etc.) — ranking just won't persist
  }
}

export function loadLastRun() {
  try {
    const raw = localStorage.getItem(LAST_RUN_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
