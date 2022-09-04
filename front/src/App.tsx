import './styles/global.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/routes';
import { UserProvider } from './providers/UserProvider';

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserProvider>
  );
};
