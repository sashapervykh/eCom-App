import { useState } from 'react';
import { useToaster } from '@gravity-ui/uikit';
import { UserData } from '../../features/auth/model/auth.types';
import { useAuth } from '../../features/auth/model/useAuth';

export function useProfileForm(userInfo: UserData) {
  const { refreshUser } = useAuth();
  const toaster = useToaster();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit =
    async (/*data: { email: string; firstName: string; lastName: string; dateOfBirth: string }*/) => {
      setIsSubmitting(true);
      console.log(userInfo);
      try {
        // const customerData = await customerAPI.apiRoot().me().get().execute();
        // const currentVersion = customerData.body.version;
        // await api.updateCustomer(userInfo.id, currentVersion, {
        //   email: data.email,
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   dateOfBirth: data.dateOfBirth,
        // });

        await refreshUser();
        toaster.add({
          name: 'profile-update-success',
          title: 'Profile Updated',
          content: 'Your profile has been successfully updated',
          theme: 'success',
        });
        return true;
      } catch (_error) {
        toaster.add({
          name: 'profile-update-error',
          title: 'Update Failed',
          content: 'Failed to update profile. Please try again.',
          theme: 'danger',
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    };

  return { handleSubmit, isSubmitting };
}
