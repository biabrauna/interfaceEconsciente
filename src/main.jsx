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


const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Cadastrar",
    element: <Cadastrar />,
  },
  {
    path: "/Home/:id",
    element: <Home />,
  },
  {
    path: "/Separacao/:id",
    element: <Separacao />,
  },
  {
    path: "/Sobre/:id",
    element: <Sobre />,
  },
  {
    path: "/Duvidas/:id",
    element: <Duvidas />,
  },
  {
    path: "/Camera/:id",
    element: <Camera />,
  },
  {
    path: "/Localizacao/:id",
    element: <MapPage />,
  },
  {
    path: "/Perfil/:id",
    element: <Perfil />,
  },
  {
    path: "/Ranking/:id",
    element: <Ranking />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)