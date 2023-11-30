import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';

function Account() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">Update your account</span>
      </div>

      <UpdateUserDataForm />
    </>
  );
}

export default Account;
