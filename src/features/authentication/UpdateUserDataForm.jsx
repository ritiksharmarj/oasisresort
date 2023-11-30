import { useForm } from 'react-hook-form';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useUpdateUser } from './hooks/useUpdateUser';

function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    user: {
      email,
      user_metadata: { name },
    },
  } = useCurrentUser();

  function onSubmit(data) {
    const { name, avatar } = data;

    const avatarImage = typeof avatar === 'string' ? avatar : avatar[0];

    updateUser(
      { name, avatar: avatarImage },
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
            <label htmlFor="name">Full name</label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
                defaultValue={name}
                {...register('name', {
                  required: 'Name cannot be kept empty',
                })}
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-700">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email address</label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="disabled:cursor-not-allowed disabled:opacity-50"
                {...register('email')}
              />
            </div>
          </div>

          <div className="col-span-2 flex items-center gap-x-12">
            <label htmlFor="avatar">Avatar image</label>
            <div>
              <input
                type="file"
                id="avatar"
                accept=".jpg, .jpeg, .png"
                {...register('avatar', {
                  validate: (fileData) => {
                    if (typeof fileData === 'string' || fileData.length > 0)
                      return true;
                  },
                })}
              />
            </div>
            {errors.avatar && (
              <p className="text-sm text-red-700">{errors.avatar.message}</p>
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
            Update account
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
