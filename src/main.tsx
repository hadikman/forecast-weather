import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router'
import { ForecastProvider } from '@context/store.tsx'
import Layout from '@/components/layout'
import HomePage from '@/pages/home'
import AddCityPage from '@/pages/add-city'
import ComparisonPage from '@/pages/comparison'

import { cities } from '@lib/constant.ts'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ForecastProvider defaultKey={cities[0]}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="add-city" element={<AddCityPage />} />
            <Route path="comparison" element={<ComparisonPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ForecastProvider>
  </StrictMode>,
)
