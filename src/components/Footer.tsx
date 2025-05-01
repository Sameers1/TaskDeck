
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="py-8 px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-scrum-purple/10 to-scrum-blue/10 backdrop-blur-sm" />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 10, 0], 
            y: [0, -10, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -10, 0], 
            y: [0, 10, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="flex gap-1 items-center mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Scrum</span>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              animate={{ 
                rotate: [0, 5, 0, -5, 0], 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              Poker
            </motion.span>
          </motion.div>
          
          <motion.p 
            className="text-sm text-center text-gray-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            © {new Date().getFullYear()} Scrum Poker App | Streamline your Agile planning
          </motion.p>
          
          <motion.div 
            className="mt-3 flex justify-center space-x-6 text-xs"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {["Privacy", "Terms", "Support", "About"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-500 hover:text-purple-500 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
