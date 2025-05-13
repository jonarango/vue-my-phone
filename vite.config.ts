import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import libCss from 'vite-plugin-libcss';
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from "vite-plugin-static-copy";


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        libCss(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: "src/lib/assets",
                    dest: "",
                },
            ],
        }),
    ],
    build: {
        cssCodeSplit: false,
        lib: {
            entry: "./src/lib/Phone.vue", // path.resolve(__dirname, 'src/lib/Phone.vue')
            name: "Phone",
            fileName: (format) => `phone.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
