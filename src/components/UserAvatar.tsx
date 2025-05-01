
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from 'framer-motion';

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
    <motion.div 
      className="flex flex-col items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div 
        whileHover={{ y: -5 }}
        animate={hasVoted ? { 
          y: [0, -5, 0],
          transition: { 
            repeat: 1, 
            duration: 0.5,
          } 
        } : {}}
      >
        <Avatar className={`${hasVoted ? 'ring-2 ring-green-500 shadow-lg shadow-green-200/50' : ''} transition-all duration-300`}>
          <AvatarFallback className={`
            ${hasVoted ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-scrum-darkPurple to-scrum-purple'} 
            text-white
          `}>
            {initials}
          </AvatarFallback>
        </Avatar>
      </motion.div>
      <motion.span 
        className="text-xs mt-1 max-w-[60px] truncate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

export default UserAvatar;
