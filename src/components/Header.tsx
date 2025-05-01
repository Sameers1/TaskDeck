
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="py-4 px-6 bg-white shadow-sm border-b flex items-center justify-between">
      <div className="flex items-center">
        <div className="font-bold text-2xl text-scrum-purple cursor-pointer" onClick={() => navigate('/')}>
          Scrum Poker
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate('/join')}>Join Session</Button>
        <Button onClick={() => navigate('/create')}>Create Session</Button>
      </div>
    </header>
  );
};

export default Header;
