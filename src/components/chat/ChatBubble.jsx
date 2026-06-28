import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message, isAI }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: isAI ? -20 : 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      sx={{
        display: 'flex',
        flexDirection: isAI ? 'row' : 'row-reverse',
        alignItems: 'flex-end',
        gap: 1.5,
        mb: 3,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          background: isAI 
            ? 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)' 
            : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isAI ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {isAI ? <Bot size={18} /> : <User size={18} />}
      </Avatar>

      <Box
        sx={{
          maxWidth: '70%',
          p: 2,
          borderRadius: isAI ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
          background: isAI 
            ? 'rgba(255, 255, 255, 0.04)' 
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: isAI ? 'rgba(255, 255, 255, 0.08)' : 'rgba(139, 92, 246, 0.3)',
          boxShadow: isAI ? 'none' : '0 4px 15px rgba(0,0,0,0.1)',
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#E5E7EB', 
            fontSize: '0.95rem', 
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatBubble;