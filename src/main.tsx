
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import ProductListPage from './pages/ProductListPage.tsx';
import Navbar from './components/navbar/Navbar.tsx';
import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/QueryClient.ts';
import AppLayout from './components/AppLayout.tsx';
import AdminDashboardPage from './pages/AdminDashboardPage.tsx';
import SearchNavbar from './components/navbar/SearchNavbar.tsx';
import ActionNavbar from './components/navbar/ActionNavbar.tsx';
import PageActionProviderLayout from './components/layouts/PageActionProviderLayout.tsx';
import ProductFormPage from './pages/ProductFormPage.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Toaster position="bottom-right" />

          <Routes>

            <Route element={<SearchNavbar />}>
              <Route element={<AppLayout />}>
                <Route
                  path="/products"
                  element={<ProductListPage />}
                />
              </Route>
            </Route>

            <Route element={<Navbar />}>
              <Route element={<AppLayout />}>
                <Route
                  path="/admin/products"
                  element={<AdminDashboardPage />}
                />
              </Route>        
            </Route>
            <Route element={<PageActionProviderLayout />}>
              <Route element={<ActionNavbar />}>
                <Route element={<AppLayout />}>
                  <Route
                    path="/admin/products/new"
                    element={<ProductFormPage />}
                  />
                  <Route
                    path="/admin/products/:id"
                    element={<ProductFormPage />}
                  />
                </Route>        
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
  
)
