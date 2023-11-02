import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[260px_minmax(300px,_1fr)] grid-rows-[auto_minmax(300px,_1fr)]">
      <Header />
      <Sidebar />

      <main className="bg-grey-50 p-10">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
