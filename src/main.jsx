import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './routes/index.jsx'
import Cadastrar from './routes/Cadastrar.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'
import Home from './routes/Home.jsx'
import Separacao from './routes/Separacao.jsx'
import Sobre from './routes/Sobre.jsx'
import Duvidas from './routes/Duvidas.jsx'
import Camera from './routes/Camera.jsx'
import MapPage from './routes/Localizacao.jsx'
import Perfil from './routes/Perfil.jsx'
import Ranking from './routes/Ranking.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { App } from './app.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ErrorBoundary><Login /></ErrorBoundary>,
      },
      {
        path: "Cadastrar", 
        element: <ErrorBoundary><Cadastrar /></ErrorBoundary>,
      },
      {
        path: "Home",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Separacao",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Separacao />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Sobre",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Sobre />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Duvidas",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Duvidas />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Camera",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Camera />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Localizacao",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Perfil",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Ranking",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Ranking />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
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
    ]
  }  
]);

ReactDOM.createRoot(document.getElementById('root')).render(<App router={router} />)