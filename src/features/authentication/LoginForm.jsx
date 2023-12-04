import { useForm } from 'react-hook-form';
import { useLogin } from './hooks/useLogin';

function LoginForm() {
  const { login, isLoading } = useLogin();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    login(data, {
      onSettled: () => {
        reset();
      },
    });
  }

  return (
    <div className="rounded-md border border-gray-200 bg-gray-0 p-6 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email">Email address</label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              autoComplete="email"
              defaultValue="demo@example.com"
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
            <p className="mt-2 text-sm text-red-700">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div className="mt-2">
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue="demo@example.com"
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
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
