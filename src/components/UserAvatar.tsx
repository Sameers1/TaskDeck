
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
    
  // Generate a pseudo-random color for each user based on their name
  const getColorFromName = (name: string) => {
    const colors = [
      'from-purple-400 to-indigo-500',
      'from-blue-400 to-cyan-500',
      'from-emerald-400 to-teal-500',
      'from-amber-400 to-orange-500',
      'from-pink-400 to-rose-500',
      'from-violet-400 to-purple-600'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const userColor = getColorFromName(name);
  const voteBadgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 15 } }
  };

  return (
    <motion.div 
      className="flex flex-col items-center relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div 
        className="relative"
        whileHover={{ y: -5 }}
        animate={hasVoted ? { 
          y: [0, -8, 0],
          transition: { 
            repeat: 1, 
            duration: 0.5,
          } 
        } : {}}
      >
        <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
          <AvatarFallback className={`bg-gradient-to-br ${userColor} text-white`}>
            {initials}
          </AvatarFallback>
        </Avatar>
        
        {hasVoted && (
          <motion.div 
            className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center shadow-md"
            variants={voteBadgeVariants}
            initial="hidden"
            animate="visible"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div 
        className="mt-2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span 
          className="text-xs font-medium max-w-[70px] truncate"
          whileHover={{ scale: 1.05 }}
        >
          {name}
        </motion.span>
        {hasVoted && (
          <motion.span 
            className="text-[10px] text-green-500 font-medium"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Voted
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserAvatar;
