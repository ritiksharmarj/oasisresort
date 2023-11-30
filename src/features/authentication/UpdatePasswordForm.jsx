import { useForm } from 'react-hook-form';
import { useUpdateUser } from './hooks/useUpdateUser';

function UpdatePasswordForm() {
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  function onSubmit(data) {
    updateUser(
      { password: data.password },
      {
        onSuccess: () => reset(),
      },
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-gray-0 p-6 shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isUpdating && 'opacity-50'}`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12">
          <div>
            <label htmlFor="password">New password</label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                placeholder="Min 6 characters"
                {...register('password', {
                  required: 'Password cannot be kept empty',
                  minLength: {
                    value: 6,
                    message: 'Must be 6 characters at least',
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-700">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="passwordConfirm">Confirm new password</label>
            <div className="mt-2">
              <input
                type="password"
                id="passwordConfirm"
                {...register('passwordConfirm', {
                  required: 'Confirm password cannot be kept empty',
                  validate: (value) =>
                    value === getValues().password || 'Passwords must be same',
                })}
              />
            </div>
            {errors.passwordConfirm && (
              <p className="mt-2 text-sm text-red-700">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            onClick={reset}
            disabled={isUpdating}
            className="text-sm font-medium text-gray-600 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isUpdating}
            className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200"
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
