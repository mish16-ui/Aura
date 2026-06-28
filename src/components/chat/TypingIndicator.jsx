import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

/**
 * TypingIndicator
 * A premium animated "thinking" state for Aura AI.
 * Uses a staggered dot animation with the brand's purple gradient.
 */
const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: { 
      y: -5, 
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mb: 3,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Bot size={18} />
      </Avatar>

      <Box
        sx={{
          p: 2,
          px: 2.5,
          borderRadius: '20px 20px 20px 4px',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.8
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            component={motion.div}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.15 }}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
              boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)'
            }}
          />
        ))}
        <Typography 
          variant="caption" 
          sx={{ 
            ml: 1, 
            color: 'text.secondary', 
            fontWeight: 600, 
            fontSize: '0.75rem',
            letterSpacing: '0.5px' 
          }}
        >
          AURA IS THINKING...
        </Typography>
      </Box>
    </Box>
  );
};

export default TypingIndicator;