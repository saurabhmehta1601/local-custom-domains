import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib'),
        '@/services': resolve('src/main/services'),
        '@shared': resolve('src/shared')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@shared": resolve("src/shared")
      }
    }

  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/components': resolve('src/renderer/src/components'),
        '@/pages': resolve('src/renderer/src/pages'),
        '@/assets': resolve('src/renderer/src/assets'),
      }
    },
    plugins: [react()]
  }
})
