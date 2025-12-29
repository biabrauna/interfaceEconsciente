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
import PerfilPublico from '@/routes/PerfilPublico';
import EditarPerfil from '@/routes/EditarPerfil';
import Ranking from '@/routes/Ranking';
import Posts from '@/routes/Posts';
import Feedback from '@/routes/Feedback';
import Desafios from '@/routes/Desafios';
import NotFound from '@/routes/NotFound';
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
        path: "Camera/:desafioId",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Camera />
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
        path: "perfil/:userId",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <PerfilPublico />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "EditarPerfil",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <EditarPerfil />
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
        path: "Posts",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Feedback",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "Desafios",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <Desafios />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: "*",
        element: (
          <ErrorBoundary>
            <NotFound />
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