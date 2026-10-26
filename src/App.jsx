import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ComoJugar from './pages/ComoJugar'
import ElegiTuBag from './pages/ElegiTuBag'
import LevelPlay from './pages/LevelPlay'
import Ranking from './pages/Ranking'
import Compartir from './pages/Compartir'
import ScreenNavigator from './components/common/ScreenNavigator'
import bagBlush from './assets/elegi-bag/bag-blush.png'
import bagTaupe from './assets/elegi-bag/bag-taupe.png'
import bagButter from './assets/elegi-bag/bag-butter.png'
import coffeeRunBackground from './assets/coffee-run/background.jpg'
import essentialKeys from './assets/coffee-run/essential-keys.png'
import essentialSunglasses from './assets/coffee-run/essential-sunglasses.png'
import essentialTube from './assets/coffee-run/essential-tube.png'
import essentialPouch from './assets/coffee-run/essential-pouch.png'
import fallingHeadphones from './assets/coffee-run/falling-headphones.png'
import fallingCamera from './assets/coffee-run/falling-camera.png'
import fallingHairbrush from './assets/coffee-run/falling-hairbrush.png'
import fallingPerfume from './assets/coffee-run/falling-perfume.png'
import fallingScarf from './assets/coffee-run/falling-scarf.png'
import fallingLaptop from './assets/coffee-run/falling-laptop.png'
import bonusPhoneCase from './assets/coffee-run/bonus-phone-case.png'
import bonusHeart from './assets/como-jugar/heart-icon.png'
import beachDayBackground from './assets/beach-day/background.jpg'
import beachEssentialSpf from './assets/beach-day/essential-spf.png'
import beachEssentialHeadphones from './assets/beach-day/essential-headphones.png'
import beachEssentialSunglasses from './assets/beach-day/essential-sunglasses.png'
import beachEssentialPhone from './assets/beach-day/essential-phone.png'
import beachEssentialGlazingMilk from './assets/beach-day/essential-glazing-milk.png'
import beachFallingUmbrella from './assets/beach-day/falling-umbrella.png'
import beachFallingCocktail from './assets/beach-day/falling-cocktail.png'
import beachFallingSpaceInvader from './assets/beach-day/falling-space-invader.png'
import beachFallingCamera from './assets/beach-day/falling-camera.png'
import beachFallingHeels from './assets/beach-day/falling-heels.png'
import beachFallingPolaroid from './assets/beach-day/falling-polaroid.png'
import nightOutBackground from './assets/night-out/background.jpg'
import nightEssentialHeels from './assets/night-out/essential-heels.png'
import nightEssentialCocktail from './assets/night-out/essential-cocktail.png'
import nightEssentialPerfume from './assets/night-out/essential-perfume.png'
import nightEssentialEyeliner from './assets/night-out/essential-eyeliner.png'
import nightEssentialLipstick from './assets/night-out/essential-lipstick.png'
import nightEssentialWallet from './assets/night-out/essential-wallet.png'
import nightFallingCoffeeCup from './assets/night-out/falling-coffee-cup.png'

const homeContent = {
  headerTitle: 'mini bag',
  headerLogoAlt: 'rhode',
  bagAlt: 'Mini bag de rhode',
  footerTagline: 'armá tu mini bag y conseguí el mayor puntaje',
  playButtonLabel: 'JUGAR',
}

const comoJugarContent = {
  title: 'CÓMO JUGAR',
  introLines: ['Atrapá los productos rhode correctos', 'y evitá los distractores.'],
  tagline: '¡Sumá puntos y superá tu récord!',
  howItWorksTitle: 'CÓMO FUNCIONA',
  howItWorksItems: [
    { label: 'MOVER', description: 'Usá el joystick para mover la canasta.' },
    { label: 'ATRAPÁ', description: 'Atrapá los productos rhode correctos para sumar puntos.' },
    { label: 'EVITÁ', description: 'No atrapes los distractores o perderás una vida.' },
  ],
  infoTitle: 'INFORMACIÓN',
  infoItems: [
    { label: '3 VIDAS', description: 'Perdés una vida cada vez que atrapás un distractor.' },
    { label: 'TIEMPO LIMITADO', description: 'Tenés tiempo limitado en cada nivel.' },
    { label: 'SUMÁ PUNTOS EXTRA', description: 'Si atrapás la funda icónica de rhode obtenes +50 puntos' },
  ],
  levelsTitle: 'TRES NIVELES',
  levelsBannerAlt: 'Los tres niveles del juego: café, playa y noche',
  nextButtonLabel: 'SIGUIENTE →',
}

const elegiTuBagContent = {
  title: 'ELEGÍ TU MINI BAG',
  subtitle: 'Elegí el color de tu rhode mini bag y empezá a jugar.',
  nameLabel: 'TU NOMBRE',
  namePlaceholder: 'Escribí tu nombre...',
  continueButtonLabel: 'CONTINUAR',
}

const bagOptions = [
  { id: 'greige', label: 'GREIGE', image: bagTaupe },
  { id: 'blush', label: 'BLUSH', image: bagBlush },
  { id: 'manteca', label: 'MANTECA', image: bagButter },
  {
    id: 'espresso',
    label: 'MARRÓN ESPRESSO',
    image: bagTaupe,
    filter: 'brightness(0.5) sepia(0.5) saturate(2) contrast(1.05)',
  },
  {
    id: 'plateado',
    label: 'PLATEADO',
    image: bagTaupe,
    filter: 'grayscale(0.9) brightness(1.15) contrast(1.15)',
  },
]

const coffeeRunContent = {
  level: 'NIVEL 01',
  levelName: 'COFFEE RUN',
  nextLevelLabel: 'NIVEL 02',
  maxLives: 3,
  timeLimitSeconds: 90,
  fallStep: 0.75,
  spawnIntervalMs: 1900,
  backgroundImage: coffeeRunBackground,
  essentialsTitle: 'ESENCIALES:',
  introSubtitle: 'Estos son tus esenciales.',
  introHighlight: '¡Memorizalos!',
  introCountdownLabel: 'EL NIVEL COMIENZA EN...',
  essentialItems: [
    { id: 'keys', label: 'Llaves', image: essentialKeys, points: 10 },
    { id: 'sunglasses', label: 'Anteojos', image: essentialSunglasses, points: 10 },
    { id: 'pouch', label: 'Cartera', image: essentialPouch, points: 20 },
    { id: 'tube', label: 'Producto rhode', image: essentialTube, points: 25 },
  ],
  distractorItems: [
    { id: 'headphones', label: 'Auriculares', image: fallingHeadphones },
    { id: 'camera', label: 'Cámara', image: fallingCamera },
    { id: 'hairbrush', label: 'Cepillo', image: fallingHairbrush },
    { id: 'perfume', label: 'Perfume', image: fallingPerfume },
    { id: 'scarf', label: 'Bufanda', image: fallingScarf },
    { id: 'laptop', label: 'Laptop', image: fallingLaptop },
  ],
  bonusItems: [
    { id: 'phone-case', label: 'Funda icónica de rhode', image: bonusPhoneCase },
    { id: 'heart', label: 'Corazón', image: bonusHeart, onlyWhenBelowMaxLives: true },
  ],
  bonusLabel: 'PUNTAJE EXTRA',
}

const beachDayContent = {
  level: 'NIVEL 02',
  levelName: 'BEACH DAY',
  nextLevelLabel: 'NIVEL 03',
  maxLives: 3,
  timeLimitSeconds: 75,
  fallStep: 0.95,
  spawnIntervalMs: 1600,
  backgroundImage: beachDayBackground,
  essentialsTitle: 'ESENCIALES:',
  introSubtitle: 'Estos son tus esenciales.',
  introHighlight: '¡Memorizalos!',
  introCountdownLabel: 'EL NIVEL COMIENZA EN...',
  difficultyNote: 'Más distractores, menos tiempo y todo cae más rápido.',
  essentialItems: [
    { id: 'spf', label: 'Protector solar', image: beachEssentialSpf, points: 10 },
    { id: 'headphones', label: 'Auriculares', image: beachEssentialHeadphones, points: 10 },
    { id: 'sunglasses', label: 'Anteojos de sol', image: beachEssentialSunglasses, points: 10 },
    { id: 'phone', label: 'Celular', image: beachEssentialPhone, points: 15 },
    { id: 'glazing-milk', label: 'Rhode Glazing Milk', image: beachEssentialGlazingMilk, points: 25 },
  ],
  distractorItems: [
    { id: 'umbrella', label: 'Sombrilla', image: beachFallingUmbrella },
    { id: 'cocktail', label: 'Trago', image: beachFallingCocktail },
    { id: 'space-invader', label: 'Invasor', image: beachFallingSpaceInvader },
    { id: 'camera', label: 'Cámara', image: beachFallingCamera },
    { id: 'heels', label: 'Tacos', image: beachFallingHeels },
    { id: 'polaroid', label: 'Cámara instantánea', image: beachFallingPolaroid },
  ],
  bonusItems: [
    { id: 'phone-case', label: 'Funda icónica de rhode', image: bonusPhoneCase },
    { id: 'heart', label: 'Corazón', image: bonusHeart, onlyWhenBelowMaxLives: true },
  ],
  bonusLabel: 'PUNTAJE EXTRA',
}

const nightOutContent = {
  level: 'NIVEL 03',
  levelName: 'NIGHT OUT',
  nextLevelLabel: 'NIVEL 04',
  maxLives: 3,
  timeLimitSeconds: 60,
  fallStep: 1.15,
  spawnIntervalMs: 1350,
  backgroundImage: nightOutBackground,
  essentialsTitle: 'ESENCIALES:',
  introSubtitle: 'Estos son tus esenciales.',
  introHighlight: '¡Memorizalos!',
  introCountdownLabel: 'EL NIVEL COMIENZA EN...',
  difficultyNote: '¡Último nivel! Todo cae más rápido que nunca.',
  essentialItems: [
    { id: 'heels', label: 'Tacos', image: nightEssentialHeels, points: 15 },
    { id: 'cocktail', label: 'Trago', image: nightEssentialCocktail, points: 15 },
    { id: 'perfume', label: 'Perfume', image: nightEssentialPerfume, points: 15 },
    { id: 'eyeliner', label: 'Delineador', image: nightEssentialEyeliner, points: 15 },
    { id: 'wallet', label: 'Billetera', image: nightEssentialWallet, points: 20 },
    { id: 'lipstick', label: 'Labial de rhode', image: nightEssentialLipstick, points: 25 },
  ],
  distractorItems: [
    { id: 'coffee-cup', label: 'Café', image: nightFallingCoffeeCup },
    { id: 'laptop', label: 'Laptop', image: fallingLaptop },
    { id: 'spf', label: 'Protector solar', image: beachEssentialSpf },
    { id: 'space-invader', label: 'Invasor', image: beachFallingSpaceInvader },
  ],
  bonusItems: [
    { id: 'phone-case', label: 'Funda icónica de rhode', image: bonusPhoneCase },
    { id: 'heart', label: 'Corazón', image: bonusHeart, onlyWhenBelowMaxLives: true },
  ],
  bonusLabel: 'PUNTAJE EXTRA',
}

const rankingContent = {
  title: 'RANKING',
  subtitle: '¡ESE FUE TU PUNTAJE FINAL!',
  messageTopThree: '¡Felicitaciones! Esperamos que mantengas tu lugar hasta el final del día.',
  messageClose: '¡Casi llegás al podio! Seguí intentando.',
  messageEncourage: 'Todavía podés llegar al top 3. ¡Seguí sumando puntos!',
  outsideBoardLabel: 'QUEDASTE EN EL PUESTO',
  playAgainLabel: 'JUGAR DE NUEVO',
  shareLabel: 'COMPARTIR',
}

const compartirContent = {
  subtitle: '¡ESTE ES TU RESULTADO!',
  bagLabel: 'SU MINI BAG',
  scoreLabel: 'PUNTAJE',
  haileyAlt: 'Hailey sosteniendo tu mini bag',
  phrases: [
    'ICONIC ✧',
    'MAIN CHARACTER ENERGY',
    'MINI BAG, MAXI ACTITUD',
    'GLAZED & READY',
    'THAT GIRL ✧',
    'LISTA PARA EL FEED',
  ],
  noticeTitle: '¡SACALE SCREEN!',
  noticeText: 'Sacale una foto a tu resultado con el celu y subila a tus redes etiquetando a',
  noticeHandle: '@rhode',
  noticeHint: 'TOCÁ LA PANTALLA PARA CONTINUAR',
  backLabel: 'VOLVER AL RANKING',
}

const mockRivals = [
  { name: 'mini_bag_lover', score: 620 },
  { name: 'beauty_addict', score: 540 },
  { name: 'gloss_girl', score: 470 },
  { name: 'rhode_fan', score: 390 },
  { name: 'peptide_queen', score: 330 },
  { name: 'lip_tint_era', score: 280 },
  { name: 'glazed_donut', score: 230 },
  { name: 'pocket_blush', score: 180 },
  { name: 'barrier_babe', score: 130 },
]

function App() {
  const [selectedBag, setSelectedBag] = useState(bagOptions[0])
  const [playerName, setPlayerName] = useState('')
  const [totalScore, setTotalScore] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home content={homeContent} />} />
        <Route path="/como-jugar" element={<ComoJugar content={comoJugarContent} />} />
        <Route
          path="/elegi-tu-bag"
          element={
            <ElegiTuBag
              content={elegiTuBagContent}
              bagOptions={bagOptions}
              onSelectBag={setSelectedBag}
              onSetName={setPlayerName}
              onResetTotalScore={() => setTotalScore(0)}
            />
          }
        />
        <Route
          path="/coffee-run"
          element={
            <LevelPlay
              key={coffeeRunContent.level}
              content={coffeeRunContent}
              selectedBag={selectedBag}
              playerName={playerName}
              totalScore={totalScore}
              onLevelComplete={setTotalScore}
              nextRoute="/beach-day"
              backTo="/elegi-tu-bag"
              backLabel="Elegí tu Mini Bag"
            />
          }
        />
        <Route
          path="/beach-day"
          element={
            <LevelPlay
              key={beachDayContent.level}
              content={beachDayContent}
              selectedBag={selectedBag}
              playerName={playerName}
              totalScore={totalScore}
              onLevelComplete={setTotalScore}
              nextRoute="/night-out"
              backTo="/coffee-run"
              backLabel="Coffee Run"
            />
          }
        />
        <Route
          path="/night-out"
          element={
            <LevelPlay
              key={nightOutContent.level}
              content={nightOutContent}
              selectedBag={selectedBag}
              playerName={playerName}
              totalScore={totalScore}
              onLevelComplete={setTotalScore}
              nextRoute="/ranking"
              backTo="/beach-day"
              backLabel="Beach Day"
            />
          }
        />
        <Route
          path="/ranking"
          element={
            <Ranking
              content={rankingContent}
              mockRivals={mockRivals}
              playerName={playerName}
              totalScore={totalScore}
              onPlayAgain={() => setTotalScore(0)}
            />
          }
        />
        <Route
          path="/compartir"
          element={
            <Compartir
              content={compartirContent}
              bagOptions={bagOptions}
              selectedBag={selectedBag}
              playerName={playerName}
              totalScore={totalScore}
            />
          }
        />
      </Routes>
      <ScreenNavigator />
    </BrowserRouter>
  )
}

export default App
