/** Prenup filenames live in /assets/images/prenup/ (spaces & parens encoded for URLs). */
const prenup = (filename) =>
  `/assets/images/prenup/${encodeURIComponent(filename)}`

const hero = prenup('1st picture.jpeg')
const fullBleedAfterVenue = prenup('2nd picture.jpeg')
const fullBleedAfterSchedule = prenup('3rd picture.jpeg')
const fullBleedAfterLoveStory = prenup('4th picture.jpeg')
const fullBleedAfterDressCode = prenup('5th picture.jpeg')

const loveStory = [
  prenup('Bestfriends pictures (love story section).jpeg'),
  prenup('Deskmates picture (lovestory section).jpeg'),
  prenup('Furparents pictures (love story section).png'),
  prenup('Partners for life picture (love story section).jpeg'),
  prenup('Study Buddies picture (love story section).jpeg'),
]

const gallery = [
  prenup('include in gallery(1).jpeg'),
  prenup('include in gallery.jpeg'),
  prenup('iclude in gallery.jpeg'),
  prenup('include in gallery3.jpeg'),
]

/** Same order as `gallery`: CSS object-position for thumbnails (object-cover), not the grid cell. */
const galleryThumbObjectPosition = [
  'center center',
  'center center',
  'center center',
  /** include in gallery3 — tall/selfie-style shot: keep top of frame (faces) visible; high % was cropping foreheads */
  'center top',
]

const countdownBackground = prenup('Save the date or Countdown picture.jpeg')

/** Opening screen triptych: top → middle → bottom row */
const openingScreenBackgrounds = [
  prenup('Partners for life picture (love story section).jpeg'),
  prenup('iclude in gallery.jpeg'),
  prenup('5th picture.jpeg'),
]

/** Pool for other features (e.g. Moments grid, random picks). */
const pool = [
  hero,
  fullBleedAfterVenue,
  fullBleedAfterSchedule,
  fullBleedAfterLoveStory,
  fullBleedAfterDressCode,
  ...loveStory,
  ...gallery,
  countdownBackground,
]

export const prenupImages = {
  pool,
  openingScreenBackgrounds,
  hero,
  fullBleedAfterVenue,
  fullBleedAfterSchedule,
  fullBleedAfterLoveStory,
  fullBleedAfterDressCode,
  loveStory,
  gallery,
  galleryThumbObjectPosition,
  countdownBackground,
  modalBackground: hero,
  ogImage: hero,
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
  momentsHero: fullBleedAfterSchedule,
  momentsGrid: [...pool],
}
