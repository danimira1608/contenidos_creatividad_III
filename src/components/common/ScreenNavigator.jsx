import { useLocation, useNavigate } from 'react-router-dom'
import './ScreenNavigator.css'

// Every screen and popup in order, so they can be reviewed without playing.
const LEVELS = [
  { path: '/coffee-run', name: 'Nivel 1' },
  { path: '/beach-day', name: 'Nivel 2' },
  { path: '/night-out', name: 'Nivel 3' },
]

const LEVEL_POPUPS = [
  { preview: 'intro', name: 'intro' },
  { preview: null, name: 'jugando' },
  { preview: 'pause', name: 'pausa' },
  { preview: 'win', name: 'ganaste' },
  { preview: 'lives', name: 'sin vidas' },
  { preview: 'time', name: 'sin tiempo' },
]

const STEPS = [
  { to: '/', label: 'Inicio' },
  { to: '/como-jugar', label: 'Cómo jugar' },
  { to: '/elegi-tu-bag', label: 'Elegí tu bag' },
  ...LEVELS.flatMap((level) =>
    LEVEL_POPUPS.map((popup) => ({
      to: popup.preview ? `${level.path}?preview=${popup.preview}` : level.path,
      label: `${level.name} · ${popup.name}`,
    })),
  ),
  { to: '/ranking', label: 'Ranking' },
  { to: '/compartir', label: 'Compartir · aviso' },
  { to: '/compartir?aviso=no', label: 'Compartir' },
]

function ScreenNavigator() {
  const location = useLocation()
  const navigate = useNavigate()

  const current = location.pathname + location.search
  const index = Math.max(
    0,
    STEPS.findIndex((step) => step.to === current),
  )

  const goTo = (nextIndex) => {
    const wrapped = (nextIndex + STEPS.length) % STEPS.length
    navigate(STEPS[wrapped].to)
  }

  return (
    <nav className="screen-navigator">
      <button type="button" className="screen-navigator__button" onClick={() => goTo(index - 1)}>
        ◀
      </button>
      <select
        className="screen-navigator__select"
        value={index}
        onChange={(event) => goTo(Number(event.target.value))}
      >
        {STEPS.map((step, stepIndex) => (
          <option key={step.to} value={stepIndex}>
            {step.label}
          </option>
        ))}
      </select>
      <button type="button" className="screen-navigator__button" onClick={() => goTo(index + 1)}>
        ▶
      </button>
    </nav>
  )
}

export default ScreenNavigator
