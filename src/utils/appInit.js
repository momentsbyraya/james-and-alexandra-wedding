import {
  getBrowserContext,
  isInAppBrowser,
  shouldUseSafariLiteMode,
} from './safariCompat'

/** Hard ceiling — loader never stays longer than this */
export const MAX_INIT_MS = 5000

const LOG_PREFIX = '[wedding-init]'

export function logInit(phase, detail) {
  if (detail !== undefined) {
    console.log(LOG_PREFIX, phase, detail)
  } else {
    console.log(LOG_PREFIX, phase)
  }
}

export function logInitWarn(phase, detail) {
  console.warn(LOG_PREFIX, phase, detail ?? '')
}

/** Race a promise against a timeout; resolves (never rejects) on timeout */
export function withTimeout(promise, ms, label) {
  let timerId
  const timeout = new Promise((resolve) => {
    timerId = window.setTimeout(() => {
      logInitWarn('timeout', `${label} (${ms}ms)`)
      resolve({ timedOut: true, label })
    }, ms)
  })

  return Promise.race([promise, timeout]).finally(() => {
    clearTimeout(timerId)
  })
}

function shouldSkipVideoPreload() {
  return shouldUseSafariLiteMode() || isInAppBrowser()
}

function preloadImage(src, { safariLite, perItemMs }) {
  return new Promise((resolve) => {
    let settled = false
    const finish = (reason) => {
      if (settled) return
      settled = true
      resolve({ src, reason })
    }

    const img = new Image()
    img.onload = () => {
      if (!safariLite && img.decode) {
        img.decode().then(() => finish('loaded')).catch(() => finish('loaded'))
      } else {
        finish('loaded')
      }
    }
    img.onerror = () => {
      logInitWarn('image-failed', src)
      finish('error')
    }
    img.src = src
    window.setTimeout(() => finish('timeout'), perItemMs)
  })
}

function preloadVideo(src, perItemMs) {
  return new Promise((resolve) => {
    let settled = false
    const finish = (reason) => {
      if (settled) return
      settled = true
      resolve({ src, reason })
    }

    try {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.muted = true
      video.playsInline = true

      const onReady = () => finish('ready')
      video.addEventListener('loadedmetadata', onReady, { once: true })
      video.addEventListener('loadeddata', onReady, { once: true })
      video.addEventListener('canplay', onReady, { once: true })
      video.addEventListener('error', () => finish('error'), { once: true })

      video.src = src
      window.setTimeout(() => finish('timeout'), perItemMs)
    } catch (err) {
      logInitWarn('video-preload-error', err?.message ?? err)
      finish('exception')
    }
  })
}

function preloadFonts(maxMs) {
  if (!document.fonts?.ready) {
    return Promise.resolve({ reason: 'no-font-api' })
  }

  return withTimeout(
    document.fonts.ready.then(() => ({ reason: 'loaded' })).catch((err) => {
      logInitWarn('fonts-error', err?.message ?? err)
      return { reason: 'error' }
    }),
    maxMs,
    'document.fonts.ready'
  )
}

/**
 * Preload first-screen assets without blocking the UI indefinitely.
 * Video is skipped on iOS / in-app browsers (WhatsApp) — Hero loads it lazily.
 */
export async function runCriticalPreload(urls) {
  const ctx = getBrowserContext()
  logInit('browser', ctx)

  const safariLite = ctx.safariLite
  const skipVideo = shouldSkipVideoPreload()
  const perItemMs = safariLite ? 2500 : 4000

  const filtered = urls.filter((src) => {
    if (src.endsWith('.mp4') && skipVideo) {
      logInit('skip-video-preload', src)
      return false
    }
    return true
  })

  logInit('preload-start', { count: filtered.length, skipVideo })

  const assetPromises = filtered.map((src) => {
    if (src.endsWith('.mp4')) {
      return preloadVideo(src, Math.min(perItemMs, 3000))
    }
    return preloadImage(src, { safariLite, perItemMs })
  })

  const [assetResults, fontResult] = await Promise.all([
    Promise.allSettled(assetPromises),
    preloadFonts(2000),
  ])

  const summary = assetResults.map((r, i) =>
    r.status === 'fulfilled' ? r.value : { src: filtered[i], reason: 'rejected' }
  )
  logInit('preload-done', { assets: summary, fonts: fontResult })

  return { summary, fontResult }
}

export function installInitErrorLogging() {
  if (typeof window === 'undefined') return () => {}

  const onError = (event) => {
    logInitWarn('window-error', event.message ?? event)
  }
  const onRejection = (event) => {
    logInitWarn('unhandled-rejection', event.reason ?? event)
  }

  window.addEventListener('error', onError)
  window.addEventListener('unhandledrejection', onRejection)

  return () => {
    window.removeEventListener('error', onError)
    window.removeEventListener('unhandledrejection', onRejection)
  }
}
