// vite.config.js
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

/// <reference types="vitest" />
// Add the reference to Vitest types if you are importing defineConfig from Vite itself

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: "src/setupTests.js",
    },
  // Other Vite configuration options...
});