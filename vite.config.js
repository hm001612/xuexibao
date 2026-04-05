import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: ['all', 'capy-1774294686971.fly.capy.computer', '.happycapy.ai', '.capy.computer']
  }
})
