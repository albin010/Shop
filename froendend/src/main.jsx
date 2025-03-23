import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './router/MainRouter';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>,
)
