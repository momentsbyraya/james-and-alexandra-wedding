import heroVideoUrl from '../../assets/videos/video1.mp4?url'

/** Prenup filenames live in /assets/images/prenup/ */
const prenup = (filename) =>
  `/assets/images/prenup/${encodeURIComponent(filename)}`

const IMG_3460 = 'IMG_3460.png'
const IMG_3409 = 'IMG_3409 (1).png'
const IMG_3426 = 'IMG_3426 (1) (1).png'
const IMG_3540 = 'IMG_3540 (1).png'
const IMG_3542 = 'IMG_3542 (1).png'
const IMG_4627 = 'IMG_4627 (1).png'
const IMG_4630 = 'IMG_4630 (1).png'
const IMG_4631 = 'IMG_4631 (1).png'
const IMG_4692 = 'IMG_4692 (1).png'

const heroVideo = heroVideoUrl
const hero = prenup(IMG_3542)
const shareThumbnail = `/assets/videos/${encodeURIComponent('for banners.png')}`
const openingBackground = prenup(IMG_3540)
const fullBleedAfterVenue = prenup(IMG_4627)
const fullBleedAfterSchedule = prenup(IMG_4631)
const fullBleedAfterEntourage = prenup(IMG_4692)
const fullBleedAfterLoveStory = prenup(IMG_3426)
const fullBleedAfterDressCode = prenup(IMG_4630)

/** Love story rows — one per timeline chapter */
const loveStory = [
  prenup(IMG_3409),
  prenup(IMG_3540),
  prenup(IMG_3426),
  prenup(IMG_4627),
  prenup(IMG_3542),
]

/** Gallery — photos not used as full-bleed section breaks */
const gallery = [
  prenup(IMG_4631),
  prenup(IMG_4692),
  prenup(IMG_3409),
  prenup(IMG_4630),
]

/** All prenup photos — Moments section shows every image */
const moments = [
  prenup(IMG_3542),
  prenup(IMG_3426),
  prenup(IMG_3540),
  prenup(IMG_3409),
  prenup(IMG_3460),
  prenup(IMG_4627),
  prenup(IMG_4630),
  prenup(IMG_4631),
  prenup(IMG_4692),
]

/** Full-width first gallery row (object-cover crop). */
const galleryFirstObjectPosition = 'center 40%'

/** Same order as `gallery`: object-position for grid thumbs (object-cover). */
const galleryThumbObjectPosition = [
  galleryFirstObjectPosition,
  'center 35%',
  'center center',
  'center 30%',
]

const countdownBackground = prenup(IMG_3540)

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
    ...moments,
    countdownBackground,
  ]),
]

export const prenupImages = {
  pool,
  criticalPreload,
  heroVideo,
  hero,
  openingBackground,
  openingBackgrounds: moments,
  fullBleedAfterVenue,
  fullBleedAfterSchedule,
  fullBleedAfterEntourage,
  fullBleedAfterLoveStory,
  fullBleedAfterDressCode,
  loveStory,
  gallery,
  moments,
  galleryFirstObjectPosition,
  galleryThumbObjectPosition,
  countdownBackground,
  modalBackground: openingBackground,
  ogImage: shareThumbnail,
  favicon: hero,
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
  momentsHero: moments[0],
  momentsGrid: moments,
}
