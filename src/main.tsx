import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import CreateCard from './pages/CreateCard/CreateCard.tsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import KnowledgePage from './pages/KnowledgePage/KnowledgePage.tsx'
import Login from './pages/Login/Login.tsx'
import MainPage from './pages/MainPage/MainPage.tsx'
import QuizPage from './pages/QuizPage/QuizPage.tsx'
import Register from './pages/Register/Register.tsx'
import store from './redux/store.ts'




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
    path: '/auth',
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <Register />
  },
  {
    path: '*',
    element: <ErrorPage />
  },
  {
    path: '/createCard',
    element: <CreateCard/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
