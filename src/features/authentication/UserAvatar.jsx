import { CaretDown } from '@phosphor-icons/react';
import { useCurrentUser } from './hooks/useCurrentUser';

function UserAvatar() {
  const { user } = useCurrentUser();
  const { name, avatar } = user.user_metadata;

  // Show first name only
  const firstName = name?.split(' ').at(0);

  return (
    <div className="ml-3 flex h-9 cursor-pointer items-center text-sm font-medium capitalize text-gray-700">
      <img
        src={avatar || '/default-user.png'}
        alt={name}
        className="mr-2 h-9 w-9 overflow-hidden rounded-full object-cover"
      />
      <div className="flex items-center">
        {firstName && <span className="mr-3">{firstName}</span>}
        <CaretDown size={16} />
      </div>
    </div>
  );
}

export default UserAvatar;
