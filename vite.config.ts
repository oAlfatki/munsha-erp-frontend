import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath,URL} from 'node:url';
export default defineConfig({plugins:[react()],resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},build:{outDir:'dist'},server:{proxy:{'/api':{target:process.env.API_PROXY_TARGET||'http://localhost:5000',changeOrigin:true}}}});
