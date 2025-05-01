
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="py-6 px-6 border-t text-center text-sm text-gray-500 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-scrum-purple/20 to-scrum-blue/20" />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()} Scrum Poker App | Streamline your Agile planning
        </motion.p>
        <motion.div 
          className="mt-2 flex justify-center space-x-4 text-xs opacity-70"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Contact Us</span>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
