import React from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import { Send, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInput = ({ value, onChange, onSend, disabled }) => {
  return (
    <Paper
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      sx={{
        p: 1.5,
        background: 'rgba(10, 11, 18, 0.95)',
        borderRadius: '24px',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        opacity: disabled ? 0.7 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        transition: 'all 0.3s ease'
      }}
    >
      <IconButton sx={{ color: 'text.secondary' }} disabled={disabled}>
        <Paperclip size={20} />
      </IconButton>
      
      <TextField
        fullWidth
        disabled={disabled}
        placeholder={disabled ? "Aura is thinking..." : "Type a message or ask Aura..."}
        variant="standard"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && onSend()}
        InputProps={{
          disableUnderline: true,
          sx: { 
            color: 'white', 
            px: 1, 
            fontSize: '0.95rem',
            '&::placeholder': { color: '#9CA3AF', opacity: 1 } 
          }
        }}
      />

      <IconButton
        onClick={onSend}
        disabled={!value.trim() || disabled}
        sx={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          color: 'white',
          width: 44,
          height: 44,
          transition: 'all 0.3s ease',
          '&:hover': { 
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
            opacity: 0.9 
          },
          '&.Mui-disabled': { 
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.2)'
          }
        }}
      >
        <Send size={20} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;