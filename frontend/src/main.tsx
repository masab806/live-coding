import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
    <RouterProvider router={router}/>
    <App />
  </StrictMode>,
)
