import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../../components/layout/layout';
import { HomePage } from '../../pages/main/main';
import { CatalogPage } from '../../pages/catalog/catalog';
import { ProductPage } from '../../pages/product-page/product-page';
import { AboutPage } from '../../pages/about-us/about-us';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { NotFoundPage } from '../../pages/404/not-found';
import { UserPage } from '../../pages/user/UserPage';
import { CartPage } from '../../pages/cart/cart-page';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:categoryKey" element={<CatalogPage />} />
          <Route path="/catalog/:categoryKey/:subcategoryKey" element={<CatalogPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
