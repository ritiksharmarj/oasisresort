import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';

function Settings() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">Update hotel settings</span>
      </div>

      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
