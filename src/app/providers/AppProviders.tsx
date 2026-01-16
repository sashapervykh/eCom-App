import { ThemeProvider, Toaster, ToasterProvider } from '@gravity-ui/uikit';
import { ReactNode } from 'react';
import { AuthProvider } from '../../components/hooks/useAuth';
import { CartProvider } from '../../components/hooks/useCart';
import { FiltersProvider } from '../../components/hooks/useFilters';
import { ProductsProvider } from '../../components/hooks/useProducts';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme="light">
      <ToasterProvider toaster={new Toaster()}>
        <AuthProvider>
          <CartProvider>
            <FiltersProvider>
              <ProductsProvider>{children}</ProductsProvider>
            </FiltersProvider>
          </CartProvider>
        </AuthProvider>
      </ToasterProvider>
    </ThemeProvider>
  );
}
