import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      'jsx': 'application/javascript',
      'js': 'application/javascript',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
})