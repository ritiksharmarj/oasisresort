import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';

function Dashboard() {
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-3xl font-semibold">Dashboard</span>

        <DashboardFilter />
      </div>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
