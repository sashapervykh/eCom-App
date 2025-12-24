import { createContext, useContext, useEffect, useState } from 'react';
// import { api } from '../../api/api';
// import { isErrorResponse, isTokenResponse } from '../../utilities/return-checked-token-response';
import { customerAPI } from '../../api/customer-api';
// import { useNavigate } from 'react-router-dom';
// import { mergeCarts } from '../../utilities/return-basket-items';
import { User } from '@supabase/supabase-js';
import { UserData } from '../../libs/supabase/types';
import { authService } from '../../services/auth.service';

interface AuthContextType {
  userInfo: UserData | null;
  isAuthenticated: boolean;
  // login: (email: string, password: string, preventRedirect?: boolean) => Promise<void>;
  refresh: (refresh_token: string) => void;

  logout: () => void;
  serverError: string | null;
  setServerError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  saveUserInfo: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const navigate = useNavigate();
  const refreshUser = async () => {
    try {
      // const customerData = await customerAPI.apiRoot().me().get().execute();
      // setUserInfo(customerData.body);
    } catch (error: unknown) {
      if (error instanceof Error && 'statusCode' in error && error.statusCode === 401) {
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
          try {
            await refresh();
            return;
          } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
          }
        }
        logout();
      }
      console.error('Failed to refresh user data:', error);
    }
  };

  // const login = async (email: string, password: string, preventRedirect = false): Promise<void> => {
  //   try {
  //     const response: unknown = await api.getAccessToken({ email, password });

  //     if (isErrorResponse(response)) {
  //       if (response.statusCode === 400) {
  //         setServerError('Please check the email and password. The user with this data is not found.');
  //       } else {
  //         setServerError(response.error);
  //       }
  //       return;
  //     }

  //     if (isTokenResponse(response)) {
  //       customerAPI.createAuthenticatedCustomer(response.token_type, response.access_token);
  //       const customerData = await customerAPI
  //         .apiRoot()
  //         .me()
  //         .login()
  //         .post({
  //           body: {
  //             email: email,
  //             password: password,
  //           },
  //         })
  //         .execute();
  //       setUserInfo(customerData.body.customer);
  //       localStorage.setItem('refresh_token', response.refresh_token);

  //       try {
  //         await mergeCarts();
  //       } catch (error) {
  //         console.error('Failed to merge carts:', error);
  //         setServerError('Failed to merge anonymous cart with user cart.');
  //       }

  //       if (!preventRedirect) {
  //         await navigate('/');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setServerError('An unexpected error occurred during login.');
  //   }
  // };

  const refresh = async (/*refresh_token: string*/) => {
    try {
      const { data, error } = await authService.updateSession();
      if (!data.session?.user) {
        throw new Error('User data is not received');
      }
      if (error) {
        throw error;
      }
      saveUserInfo(data.session.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserInfo = (user: User) => {
    const userIdentity = user.identities?.[0].identity_data;
    const userData = {
      id: user.id,
      email: user.email,
      firstName: userIdentity?.firstName as string,
      lastName: userIdentity?.lastName as string,
      dateOfBirth: userIdentity?.dataOfBirth as string,
      addresses: [
        {
          id: 'billing',
          streetName: userIdentity?.billingStreet as string,
          city: userIdentity?.billingCity as string,
          country: userIdentity?.billingCountry as string,
          postalCode: userIdentity?.billingPostalCode as string,
        },
        {
          id: 'shipping',
          streetName: userIdentity?.shippingStreet as string,
          city: userIdentity?.shippingCity as string,
          country: userIdentity?.shippingCountry as string,
          postalCode: userIdentity?.shippingPostalCode as string,
        },
      ],
      sameAddress: userIdentity?.sameAddress as boolean,
      setAsDefaultShipping: userIdentity?.setAsDefaultShipping as boolean,
      setAsDefaultBilling: userIdentity?.setAsDefaultBilling as boolean,
    };
    setUserInfo(userData);
  };

  const logout = () => {
    customerAPI.createAnonymCustomer();
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('anonymous_user_id');
    localStorage.removeItem('anonymous_cart_id');
    setUserInfo(null);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const authContextValue = {
    isAuthenticated: !!userInfo,
    userInfo,
    // login,

    refresh,
    logout,
    serverError,
    setServerError,
    isLoading,
    refreshUser,
    saveUserInfo,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
