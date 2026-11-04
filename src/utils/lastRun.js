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

const CURRENT_PLAYER_KEY = 'rhode-mini-bag-current-player'

// The name and bag chosen in "Elegí tu mini bag", kept so a page reload in the
// middle of a run doesn't turn the player into the default "Jugadora".
export function saveCurrentPlayer(name, bagId) {
  try {
    localStorage.setItem(CURRENT_PLAYER_KEY, JSON.stringify({ name, bagId }))
  } catch {
    // localStorage unavailable (private mode, etc.) — a reload will just lose the name
  }
}

export function loadCurrentPlayer() {
  try {
    const raw = localStorage.getItem(CURRENT_PLAYER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
