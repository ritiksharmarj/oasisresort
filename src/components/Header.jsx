import Logout from '../features/authentication/Logout';

function Header() {
  return (
    <div className="border-b border-b-gray-100 bg-gray-0 p-10">
      <Logout />
    </div>
  );
}

export default Header;
