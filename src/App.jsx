import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Footer from './components/Footer'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'
import Details from './components/pages/Details'
import Moments from './components/pages/Moments'
import { AudioProvider, useAudio } from './contexts/AudioContext'
import { couple, prenupImages } from './data'
import ApprovalWatermark from './components/ApprovalWatermark'
import {
  installInitErrorLogging,
  logInit,
  logInitWarn,
  MAX_INIT_MS,
  runCriticalPreload,
  withTimeout,
} from './utils/appInit'

function AppContent() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { play } = useAudio()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    const finishLoading = (reason) => {
      if (cancelled) return
      logInit('loader-hidden', reason)
      setIsLoading(false)
    }

    const removeErrorLogging = installInitErrorLogging()

    const forceTimer = window.setTimeout(() => {
      finishLoading('max-init-timeout')
    }, MAX_INIT_MS)

    const init = async () => {
      try {
        logInit('init-start')
        await withTimeout(
          runCriticalPreload(prenupImages.criticalPreload),
          MAX_INIT_MS - 500,
          'critical-preload'
        )
        finishLoading('preload-complete')
      } catch (err) {
        logInitWarn('init-error', err?.message ?? err)
        finishLoading('init-error')
      }
    }

    init()

    return () => {
      cancelled = true
      clearTimeout(forceTimer)
      removeErrorLogging()
    }
  }, [])

  const handleEnvelopeOpen = async () => {
    try {
      await play()
    } catch (err) {
      logInitWarn('audio-play', err?.message ?? err)
    }
    setShowInvitation(true)
    navigate('/')
  }

  const handleCloseRSVP = () => {
    setIsRSVPModalOpen(false)
  }

  return (
    <div className="App min-h-screen wedding-gradient">
      <DynamicTitle />
      <ScrollToTop />
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-8 sm:gap-10 bg-[#F8F3EA] px-4">
          <p
            className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gold"
            style={{ fontFamily: 'var(--letter-font, "Great Vibes", cursive)' }}
          >
            {couple.together}
          </p>
          <Loader />
        </div>
      )}
      {!isLoading && !showInvitation && (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      )}
      {!isLoading && showInvitation && (
        <>
          <Routes>
            <Route path="/" element={<Home onOpenRSVP={() => setIsRSVPModalOpen(true)} />} />
            <Route path="/details" element={<Details />} />
            <Route path="/moments" element={<Moments />} />
          </Routes>
          <Footer />
        </>
      )}
      <RSVPModal isOpen={isRSVPModalOpen} onClose={handleCloseRSVP} />
      <ApprovalWatermark />
    </div>
  )
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  )
}

export default App
