import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configurações do NProgress
NProgress.configure({
  showSpinner: false,
  speed: 300,
  minimum: 0.1,
  trickleSpeed: 200,
});

export const progressBar = {
  start: () => {
    NProgress.start();
  },

  done: () => {
    NProgress.done();
  },

  inc: () => {
    NProgress.inc();
  },

  set: (n: number) => {
    NProgress.set(n);
  },
};

// Hook para usar em requisições
export function useProgress() {
  const start = () => progressBar.start();
  const done = () => progressBar.done();

  return { start, done };
}
