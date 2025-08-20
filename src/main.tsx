import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ForecastProvider } from '@context/store.tsx'
import App from './App.tsx'

import { cities } from '@lib/constant.ts'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ForecastProvider defaultKey={cities[0]}>
      <App />
    </ForecastProvider>
  </StrictMode>,
)
