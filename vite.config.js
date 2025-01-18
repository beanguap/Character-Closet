import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      'jsx': 'text/javascript',
      'js': 'text/javascript',
    },
  },
})