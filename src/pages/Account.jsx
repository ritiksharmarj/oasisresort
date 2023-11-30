import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';

function Account() {
  return (
    <div className=" space-y-10">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-semibold">Update your account</span>
      </div>

      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </div>
  );
}

export default Account;
