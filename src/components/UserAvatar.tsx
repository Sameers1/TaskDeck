
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  hasVoted?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, hasVoted = false }) => {
  // Generate initials from name
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="flex flex-col items-center">
      <Avatar className={`${hasVoted ? 'ring-2 ring-green-500' : ''}`}>
        <AvatarFallback className="bg-scrum-darkPurple text-white">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="text-xs mt-1 max-w-[60px] truncate">{name}</span>
    </div>
  );
};

export default UserAvatar;
