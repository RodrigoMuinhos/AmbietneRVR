import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: { navigateFallback: "/" },
            manifest: {
                name: "RVR Web",
                short_name: "RVR",
                start_url: "/",
                display: "standalone",
                background_color: "#111827",
                theme_color: "#111827",
                icons: [
                    { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
                    { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
                ],
            },
        }),
    ],
    server: {
        host: true,
        port: 5173,
        proxy: {
            "/api": {
                target: "http://localhost:3333",
                changeOrigin: true,
            },
        },
    },
    preview: { host: true, port: 4173 },
});
