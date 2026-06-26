import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync, readFileSync } from 'fs'
import { join } from 'path'

const SHARE_IMAGE_PATH = '/assets/video/share-thumbnail.png'

function resolveBuildSiteUrl() {
  try {
    const couple = JSON.parse(readFileSync('src/data/couple.json', 'utf-8'))
    if (couple.siteUrl) return couple.siteUrl.replace(/\/$/, '')
  } catch {
    // couple.json unavailable during config load
  }

  return (process.env.URL || process.env.VITE_SITE_URL || '').replace(/\/$/, '')
}

/** Inject absolute Open Graph URLs at build time (WhatsApp/Messenger read index.html, not JS). */
function injectSocialMetaPlugin() {
  return {
    name: 'inject-social-meta',
    transformIndexHtml(html) {
      const siteUrl = resolveBuildSiteUrl()
      const ogImage = siteUrl ? `${siteUrl}${SHARE_IMAGE_PATH}` : SHARE_IMAGE_PATH
      const canonical = siteUrl ? `${siteUrl}/` : '/'

      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__OG_IMAGE__', ogImage)
        .replaceAll('__CANONICAL_URL__', canonical)
    },
  }
}

// Custom plugin to copy assets and Netlify headers
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const copyDir = (src, dest) => {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true })
        }
        
        const items = readdirSync(src)
        items.forEach(item => {
          const srcPath = join(src, item)
          const destPath = join(dest, item)
          
          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
          } else {
            copyFileSync(srcPath, destPath)
          }
        })
      }
      
      copyDir('assets', 'dist/assets')
      
      // Copy _headers file from public to dist root for Netlify
      if (existsSync('public/_headers')) {
        copyFileSync('public/_headers', 'dist/_headers')
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectSocialMetaPlugin(), copyAssetsPlugin()],
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: [
      'subadministrative-alice-scrofulously.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  publicDir: 'assets'
}) 