
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header 
      className="py-4 px-6 bg-white/80 backdrop-blur-md shadow-sm border-b flex items-center justify-between sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div 
        className="flex items-center"
        whileHover={{ scale: 1.03 }}
      >
        <div 
          className="font-bold text-2xl cursor-pointer relative" 
          onClick={() => navigate('/')}
        >
          <span className="bg-gradient-to-r from-scrum-purple to-scrum-blue bg-clip-text text-transparent">Scrum Poker</span>
          <motion.div 
            className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-scrum-purple to-scrum-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </div>
      </motion.div>
      <div className="flex gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" onClick={() => navigate('/join')}>Join Session</Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => navigate('/create')}>Create Session</Button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
