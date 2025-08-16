import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import Login from '@/routes/Login';
import Cadastrar from '@/routes/Cadastrar';
import Home from '@/routes/Home';
import Separacao from '@/routes/Separacao';
import Sobre from '@/routes/Sobre';
import Duvidas from '@/routes/Duvidas';
import Camera from '@/routes/Camera';
import MapPage from '@/routes/Localizacao';
import Perfil from '@/routes/Perfil';
import Ranking from '@/routes/Ranking';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import { App } from './app';

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

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(<App router={router} />);