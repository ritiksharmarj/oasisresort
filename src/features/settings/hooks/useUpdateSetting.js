import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../../services/apiSettings';
import { useCurrentUser } from '../../authentication/hooks/useCurrentUser';

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isAdmin } = useCurrentUser();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: (data) => {
      if (isAdmin) updateSettingApi(data);
      else throw new Error("You don't have permission.");
    },
    onSuccess: () => {
      toast.success('Settings successfully updated.');

      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
