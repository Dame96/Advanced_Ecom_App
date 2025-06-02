/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // use global test, expect etc.
    environment: 'jsdom',    // simulate browser environment
    setupFiles: './src/setupTests.js', // optional setup file for jest-dom etc.
    // coverage: { ... }     // optional coverage config
  },
});
// This is a basic Vite configuration file for a React project with Vitest for testing.