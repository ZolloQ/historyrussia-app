import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import KnowledgePage from './pages/KnowledgePage/KnowledgePage.tsx'
import Login from './pages/Login/Login.tsx'
import MainPage from './pages/MainPage/MainPage.tsx'
import QuizPage from './pages/QuizPage/QuizPage.tsx'
import Register from './pages/Register/Register.tsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/card/:id',
    element: <KnowledgePage />
  },
  {
    path: '/card/:id/quiz',
    element: <QuizPage />,
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <Register />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
