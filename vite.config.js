import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(), 
    svgr({ 
      svgrOptions: {
        // svgr options
      },
    }),
  ],
  server: {
    port: 5000, // Specify your desired port here
    /*proxy: {
      '/api':'https://policy-backend-nafh.onrender.com',
    },*/

  } 
})