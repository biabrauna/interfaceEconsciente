import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://airy-charm-production.up.railway.app/',
        changeOrigin: true,
        secure: false,
      }
    },
    middlewareMode: false, // necessário para setupMiddlewares funcionar
    setupMiddlewares: (middlewares, devServer) => {
      middlewares.use(
        history({
          verbose: true,
          disableDotRule: true, // importante para permitir arquivos com ponto (ex: .js, .css)
        })
      );
      return middlewares;
    },
  },
});
