
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
        scale: 1.05, 
        rotate: 2,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
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
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="card-content">
        <span className="card-value">{value}</span>
      </div>
    </motion.div>
  );
};

export default PokerCard;
