import '@gravity-ui/uikit/styles/styles.css';
import '@gravity-ui/uikit/styles/fonts.css';
import { ToasterComponent } from '@gravity-ui/uikit';
import { AppProviders } from './providers';
import { AppRouter } from './routes';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
      <ToasterComponent />
    </AppProviders>
  );
}
