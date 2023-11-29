import LoginForm from '../features/authentication/LoginForm';

function Login() {
  return (
    <div className="grid min-h-full grid-cols-[600px_minmax(440px,_1fr)] bg-gray-50">
      <div className="relative">
        <img
          src="/pattern.png"
          alt="Pattern"
          className="h-screen w-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center px-24 py-12">
        <div className="w-[400px]">
          <img src="/favicon.png" alt="" className="mx-auto h-10 w-auto" />
          <h2 className="mb-10 mt-6 text-center text-2xl font-bold leading-9">
            Welcome to Oasis Resort
          </h2>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
