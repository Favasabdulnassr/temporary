import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(__dirname, 'src/assets')

const MIME_TYPES = { '.gif': 'image/gif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.mp3': 'audio/mpeg' }

const couplePhotoDir = path.resolve(__dirname, 'src/assets/couple_photo')

// Serve src/assets at /assets in dev (Vite does not serve src/ as static files by default)
function serveAssetsPlugin() {
  return {
    name: 'serve-src-assets',
    configureServer(server) {
      // Dev-only: serve couple photos by index (1-based) - reads WhatsApp filenames from config
      server.middlewares.use((req, res, next) => {
        const match = req.method === 'GET' && req.url && req.url.match(/^\/api\/couple-photo\/(\d+)(?:\?|$)/)
        if (!match) return next()
        const index = parseInt(match[1], 10)
        let config
        try {
          config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'))
        } catch (_) {
          res.statusCode = 500
          res.end('Config error')
          return
        }
        const photos = config.couplePhotos
        if (!Array.isArray(photos) || index < 1 || index > photos.length) {
          res.statusCode = 404
          res.end('Not found')
          return
        }
        const imagePath = photos[index - 1]?.image
        const filename = typeof imagePath === 'string' ? imagePath.split('/').pop() : null
        if (!filename) {
          res.statusCode = 404
          res.end('Not found')
          return
        }
        const file = path.join(couplePhotoDir, filename)
        fs.stat(file, (err, stat) => {
          if (err || !stat.isFile()) {
            res.statusCode = 404
            res.end('Not found')
            return
          }
          fs.readFile(file, (err, data) => {
            if (err) {
              res.statusCode = 500
              res.end('Error')
              return
            }
            const ext = path.extname(file)
            res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream')
            res.end(data)
          })
        })
      })
      // Dev-only: serve any asset by path via query (handles spaces/special chars in filenames)
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' || !req.url.startsWith('/api/serve-asset')) return next()
        const q = req.url.indexOf('?')
        if (q === -1) return next()
        const params = new URLSearchParams(req.url.slice(q))
        let assetPath = params.get('path')
        if (!assetPath) {
          res.statusCode = 400
          res.end('Missing path')
          return
        }
        try {
          assetPath = decodeURIComponent(assetPath)
        } catch (_) {
          res.statusCode = 400
          res.end('Invalid path')
          return
        }
        if (!assetPath.startsWith('/assets/') || assetPath.includes('..')) {
          res.statusCode = 400
          res.end('Invalid path')
          return
        }
        const relativePath = assetPath.slice(8) // strip '/assets/'
        const file = path.join(assetsDir, relativePath)
        fs.stat(file, (err, stat) => {
          if (err || !stat.isFile()) {
            res.statusCode = 404
            res.end('Not found')
            return
          }
          fs.readFile(file, (err, data) => {
            if (err) {
              res.statusCode = 500
              res.end('Error')
              return
            }
            const ext = path.extname(file)
            res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream')
            res.end(data)
          })
        })
      })
      server.middlewares.use('/assets', (req, res, next) => {
        const raw = (req.url === '/' ? '/index.html' : req.url).split('?')[0]
        let safePath = raw.replace(/^\//, '').replace(/^(\.\.(\/|\\|$))+/, '')
        try {
          safePath = decodeURIComponent(safePath)
        } catch (_) {}
        if (safePath.includes('..')) return next()
        const file = path.join(assetsDir, safePath)
        fs.stat(file, (err, stat) => {
          if (err || !stat.isFile()) return next()
          fs.readFile(file, (err, data) => {
            if (err) return next()
            const ext = path.extname(file)
            res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream')
            res.end(data)
          })
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [serveAssetsPlugin(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    target: 'es2015',
    minify: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
})
