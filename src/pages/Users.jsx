import SignupForm from '../features/authentication/SignupForm';

function Users() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">Create new user</span>
      </div>

      <SignupForm />
    </>
  );
}

export default Users;
