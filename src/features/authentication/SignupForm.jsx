import { useForm } from 'react-hook-form';
import { useSignUp } from './hooks/useSignUp';

function SignupForm() {
  const { signUp, isLoading } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  function onSubmit(data) {
    const { name, email, password } = data;

    signUp(
      { name, email, password },
      {
        onSuccess: () => reset(),
      },
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-gray-0 p-6 shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isLoading && 'opacity-50'}`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12">
          <div>
            <label htmlFor="name">Full name</label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
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
                {...register('email', {
                  required: 'Email cannot be kept empty',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Email is not valid',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-700">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
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
            <label htmlFor="passwordConfirm">Confirm password</label>
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
            disabled={isLoading}
            className="text-sm font-medium text-gray-600 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200"
          >
            Create new user
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
