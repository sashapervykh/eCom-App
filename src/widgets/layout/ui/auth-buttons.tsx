import { Button } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import { CartButton } from '../../../components/cart-button/cart-button';
import { useAuth } from '../../../features/auth/model/useAuth';

export const AuthButtons = ({ mobile = false }: { mobile?: boolean }) => {
  const { isAuthenticated, logout, userInfo } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    void navigate('/login');
  };

  const buttonSize = mobile ? 'm' : 'l';
  const buttonWidth = mobile ? 'max' : undefined;

  if (isAuthenticated) {
    return (
      <>
        <Button view="action" onClick={() => navigate('/user')} size={buttonSize} width={buttonWidth}>
          {userInfo?.firstName ?? 'User'}
        </Button>
        <CartButton buttonSize={buttonSize} buttonWidth={buttonWidth} />
        <Button view="outlined" onClick={onLogout} size={buttonSize} width={buttonWidth}>
          Log Out
        </Button>
      </>
    );
  }

  return (
    <>
      <Button view="action" onClick={() => navigate('/login')} size={buttonSize} width={buttonWidth}>
        Sign In
      </Button>
      <Button view="outlined" onClick={() => navigate('/registration')} size={buttonSize} width={buttonWidth}>
        Sign Up
      </Button>
    </>
  );
};
