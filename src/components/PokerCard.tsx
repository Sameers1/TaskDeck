
import React from 'react';

interface PokerCardProps {
  value: number | string;
  isSelected: boolean;
  onSelect: () => void;
}

const PokerCard: React.FC<PokerCardProps> = ({ value, isSelected, onSelect }) => {
  return (
    <div 
      className={`poker-card ${isSelected ? 'poker-card-selected' : ''}`}
      onClick={onSelect}
    >
      {value}
    </div>
  );
};

export default PokerCard;
