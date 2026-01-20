import { useState } from 'react';
import { useToaster } from '@gravity-ui/uikit';
import { UserData } from '../../features/auth/model/auth.types';
import { useAuth } from '../../features/auth/model/useAuth';

export function usePasswordChange(userInfo: UserData) {
  const { refreshUser /* login */ } = useAuth();
  const toaster = useToaster();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(userInfo);

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    setIsSubmitting(true);
    console.log(Number(currentPassword), Number(newPassword));
    try {
      // const tokenResponse = await api.getAccessToken({
      //   email: userInfo.email,
      //   password: currentPassword,
      // });

      // if (!isTokenResponse(tokenResponse)) {
      //   throw new Error('Invalid email or password');
      // }

      // customerAPI.createAuthenticatedCustomer(tokenResponse.token_type, tokenResponse.access_token);

      // const customerData = await customerAPI.apiRoot().me().get().execute();
      // const currentVersion = customerData.body.version;

      // await api.changePassword({
      //   id: userInfo.id,
      //   version: currentVersion,
      //   currentPassword,
      //   newPassword,
      // });

      // await login(userInfo.email, newPassword, true);
      await refreshUser();

      toaster.add({
        name: 'password-success',
        title: 'Success',
        content: 'Password updated successfully',
        theme: 'success',
      });
      return true;
    } catch (error: unknown) {
      console.error('Password change error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to change password. Please check your current password.';
      toaster.add({
        name: 'password-error',
        title: 'Error',
        content: errorMessage,
        theme: 'danger',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handlePasswordChange, isSubmitting };
}
