import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      // 👇 When your frontend makes a request to /api/...,
      // it will be proxied to your backend.
      "/api": {
        target: "http://localhost:8080", // your backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix if needed
      },
    },
  },
});
