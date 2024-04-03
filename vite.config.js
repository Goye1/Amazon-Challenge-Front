import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://Goye1.github.io/amazon-challenge-front", // <= agrega la llave base
})
