import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './routes/index.jsx'
import Cadastrar from './routes/Cadastrar.jsx'
import SplashScreen from './routes/SplashScreen.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Separacao from './routes/Separacao.jsx'
import Sobre from './routes/Sobre.jsx'
import Duvidas from './routes/Duvidas.jsx'
import Camera from './routes/Camera.jsx'
import MapPage from './routes/Localizacao.jsx'
import Perfil from './routes/Perfil.jsx'
import Ranking from './routes/Ranking.jsx'

const ErrorBoundary = ({ children }) => {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><Login /></ErrorBoundary>,
  },
  {
    path: "/Cadastrar",
    element: <ErrorBoundary><Cadastrar /></ErrorBoundary>,
  },
  {
    path: "/Home",
    element: <ErrorBoundary><Home /></ErrorBoundary>,
  },
  {
    path: "/Separacao",
    element: <ErrorBoundary><Separacao /></ErrorBoundary>,
  },
  {
    path: "/Sobre",
    element: <ErrorBoundary><Sobre /></ErrorBoundary>,
  },
  {
    path: "/Duvidas",
    element: <ErrorBoundary><Duvidas /></ErrorBoundary>,
  },
  {
    path: "/Camera",
    element: <ErrorBoundary><Camera /></ErrorBoundary>,
  },
  {
    path: "/Localizacao",
    element: <ErrorBoundary><MapPage /></ErrorBoundary>,
  },
  {
    path: "/Perfil",
    element: <ErrorBoundary><Perfil /></ErrorBoundary>,
  },
  {
    path: "/Ranking",
    element: <ErrorBoundary><Ranking /></ErrorBoundary>,
  },
  {
    path: "*",
    element: (
      <ErrorBoundary>
        <div>
          <h2>404 - Página não encontrada</h2>
          <p>Não encontramos o que você está procurando.</p>
          <a href="/">Voltar para a página inicial</a>
        </div>
      </ErrorBoundary>
    ),
  }  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)