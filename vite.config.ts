import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "favicon.ico",
                "robots.txt",
                "sitemap.xml",
                "plan_padrino.png",
                "unab_logo.png",
            ],
            manifest: {
                short_name: "Plan Padrino UNAB",
                name: "Plan Padrino UNAB",
                description:
                    "Plan Padrino UNAB, Sistema de Gestión y Seguimiento De Tutorías Estudiantiles En Línea Por Estudiantes Para Estudiantes.",
                start_url: "https://stge.pages.dev",
                display: "standalone",
                theme_color: "#000000",
                background_color: "#ffffff",
                screenshots: [
                    {
                        src: "https://stge.pages.dev/plan_padrino.png",
                        sizes: "1600x900",
                        type: "image/png",
                    },
                ],
                icons: [
                    {
                        src: "https://stge.pages.dev/unab_logo.png",
                        sizes: "32x32",
                        type: "image/png",
                    },
                    {
                        src: "https://stge.pages.dev/unab_logo.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "https://stge.pages.dev/unab_logo.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "https://stge.pages.dev/unab_logo.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
    optimizeDeps: {
        exclude: ["axios"],
    },
});
