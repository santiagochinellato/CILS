import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/es/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png'
      ],
      manifest: {
        name: 'Estudio CILS',
        short_name: 'CILS',
        theme_color: '#106973',
        background_color: '#F8FAFB',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // Disabled by default; can be enabled with VITE_PWA env variable
      disable: true
    })
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:4000'
    },
    // Permitir hosts externos (ngrok) para previews remotas
    allowedHosts: [
      '2b8923832858.ngrok-free.app',
      '.ngrok-free.app'
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'react-icons'],
        }
      }
    }
  }
});
