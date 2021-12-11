import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    root: path.resolve(__dirname, '../src'),
    build: {
        outDir: path.resolve(__dirname, '../dist')
    },
    resolve: {
        alias: [
            // put your alias here
        ]
    },
    server: {
        port: 3500,
        https: true
    },
    plugins: [react()]
})
