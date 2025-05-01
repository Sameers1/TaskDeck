
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 px-6 bg-white border-t text-center text-sm text-gray-500">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} Scrum Poker App | Streamline your Agile planning</p>
      </div>
    </footer>
  );
};

export default Footer;
