import { App } from './app/App';
import ReactDOM from 'react-dom/client';
import './style.css';

const container = document.createElement('div');
document.body.append(container);
ReactDOM.createRoot(container).render(<App />);
