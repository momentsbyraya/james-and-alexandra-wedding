/** Prenup filenames live in /assets/images/prenup/ */
const prenup = (filename) =>
  `/assets/images/prenup/${encodeURIComponent(filename)}`

const hero = prenup('IMG_8139.jpg')
const openingBackground = prenup('IMG_5200.jpg')
const fullBleedAfterVenue = prenup('IMG_5294.jpg')
const fullBleedAfterSchedule = prenup('IMG_5210.jpg')
const fullBleedAfterEntourage = prenup('IMG_5202.jpg')
const fullBleedAfterLoveStory = prenup('IMG_5288.jpg')
const fullBleedAfterDressCode = prenup('IMG_8164.jpg')

/** Love story rows (timeline): Schoolmates → College → Forever */
const loveStory = [
  prenup('IMG_5321.jpg'),
  prenup('IMG_5344.jpg'),
  prenup('IMG_8150.jpg'),
]

/** Gallery only — photos not used elsewhere on the invitation */
const gallery = [
  prenup('IMG_8223.jpg'),
  prenup('IMG_8306.jpg'),
  prenup('IMG_8430.jpg'),
  prenup('IMG_8447.jpg'),
]

/** Full-width first gallery row (object-cover crop). */
const galleryFirstObjectPosition = 'center 52%'

/** Same order as `gallery`: object-position for grid thumbs (object-cover). */
const galleryThumbObjectPosition = [
  galleryFirstObjectPosition,
  'center top',
  'center bottom',
  'center 54%',
]

const countdownBackground = prenup('IMG_8552.jpg')

/** First-screen only — avoid decoding the full gallery on load (Safari memory). */
const criticalPreload = [
  hero,
  openingBackground,
  '/assets/images/graphics/bg-2.png',
]

/** Pool for other features (e.g. Moments grid, preload). Order preserved, duplicates removed. */
const pool = [
  ...new Set([
    hero,
    openingBackground,
    fullBleedAfterVenue,
    fullBleedAfterSchedule,
    fullBleedAfterEntourage,
    fullBleedAfterLoveStory,
    fullBleedAfterDressCode,
    ...loveStory,
    ...gallery,
    countdownBackground,
  ]),
]

export const prenupImages = {
  pool,
  criticalPreload,
  hero,
  openingBackground,
  fullBleedAfterVenue,
  fullBleedAfterSchedule,
  fullBleedAfterEntourage,
  fullBleedAfterLoveStory,
  fullBleedAfterDressCode,
  loveStory,
  gallery,
  galleryFirstObjectPosition,
  galleryThumbObjectPosition,
  countdownBackground,
  modalBackground: openingBackground,
  ogImage: countdownBackground,
  favicon: countdownBackground,
  rsvpBackground: fullBleedAfterDressCode,
  fullBleedMain: fullBleedAfterVenue,
  splitA: {
    left: fullBleedAfterVenue,
    right: fullBleedAfterSchedule,
  },
  splitB: {
    left: fullBleedAfterLoveStory,
    right: fullBleedAfterDressCode,
  },
  splitC: {
    left: loveStory[0],
    right: loveStory[1],
  },
  momentsHero: fullBleedAfterSchedule,
  momentsGrid: [...pool],
}
