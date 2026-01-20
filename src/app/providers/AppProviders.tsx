import { ThemeProvider, Toaster, ToasterProvider } from '@gravity-ui/uikit';
import { ReactNode } from 'react';

import { CartProvider } from '../../components/hooks/useCart';
import { FiltersProvider } from '../../components/hooks/useFilters';
import { ProductsProvider } from '../../components/hooks/useProducts';
import { AuthProvider } from '../../features/auth/model/auth.provider';

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
