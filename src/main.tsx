
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import ProductListPage from './pages/ProductListPage.tsx';
import Navbar from './components/Navbar.tsx';
import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/QueryClient.ts';
import AppLayout from './components/AppLayout.tsx';
import AdminDashboardPage from './pages/AdminDashboardPage.tsx';
import CreateProductPage from './pages/CreateProductPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                path="/products"
                element={<ProductListPage />}
              />

              <Route
                path="/admin/products"
                element={<AdminDashboardPage />}
              />

              <Route
                path="/admin/products/new"
                element={<CreateProductPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
  
)
