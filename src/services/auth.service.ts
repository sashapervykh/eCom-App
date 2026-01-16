import { supabase } from '../shared/api/client';

class AuthService {
  async updateSession() {
    return supabase.auth.getSession();
  }

  async signUp({ email, password, options }: { email: string; password: string; options: object }) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: options },
    });
  }

  async signIn({ email, password }: { email: string; password: string }) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async logout() {
    return supabase.auth.signOut();
  }
}

export const authService = new AuthService();
