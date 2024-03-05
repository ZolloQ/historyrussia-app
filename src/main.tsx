import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import MainPage from './pages/MainPage/MainPage.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    children: [
      {
        path: '/card/:id',
        element: <MainPage/>
      }
    ]
  },
  
  
  
  {
    path: '*',
    element: <ErrorPage/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
