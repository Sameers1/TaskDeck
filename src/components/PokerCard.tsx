
import React from 'react';
import { motion } from 'framer-motion';

interface PokerCardProps {
  value: number | string;
  isSelected: boolean;
  onSelect: () => void;
}

const PokerCard: React.FC<PokerCardProps> = ({ value, isSelected, onSelect }) => {
  return (
    <motion.div 
      className={`poker-card ${isSelected ? 'poker-card-selected' : ''}`}
      onClick={onSelect}
      whileHover={{ 
        scale: 1.1, 
        rotate: isSelected ? 0 : 5,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3 }
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
    >
      <div className="card-content">
        <motion.span 
          className="card-value"
          animate={isSelected ? { 
            scale: [1, 1.2, 1], 
            transition: { repeat: 0, duration: 0.5 } 
          } : {}}
        >
          {value}
        </motion.span>
      </div>
      {isSelected && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="absolute -z-10 inset-0 bg-gradient-to-r from-purple-400 via-blue-300 to-indigo-400 opacity-60 rounded-lg"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PokerCard;
