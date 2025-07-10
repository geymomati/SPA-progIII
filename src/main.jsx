import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'

import { BrowserRouter } from 'react-router-dom'
import { PresupuestosProvider } from './context/PresupuestosContext.jsx'
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/reactQueryClient';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PresupuestosProvider>
          <App />
        </PresupuestosProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
