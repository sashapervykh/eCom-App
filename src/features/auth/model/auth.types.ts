import { User } from '@supabase/supabase-js';

export interface AuthContextType {
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

export interface UserData {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses: Address[];
  sameAddress: boolean;
  setAsDefaultShipping: boolean;
  setAsDefaultBilling: boolean;
}

interface Address {
  id: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}
