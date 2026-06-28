import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Avatar, 
  Badge,
  useTheme
} from '@mui/material';
import { Menu, Bell, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgba(3, 7, 18, 0.5)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: 'none',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        {/* Left Side: Menu Toggle & Brand (Mobile) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={onMenuClick}
            sx={{ color: 'white', display: { md: 'flex' } }}
          >
            <Menu size={24} />
          </IconButton>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
             <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles color="white" size={18} />
            </Box>
            <Typography variant="h6" fontWeight="800" letterSpacing="-1px">
              AURA
            </Typography>
          </Box>

          <Typography 
            variant="body1" 
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              fontWeight: 500, 
              color: 'text.secondary',
              ml: 2 
            }}
          >
            Good Evening, <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Mishtha 👋</span>
          </Typography>
        </Box>

        {/* Right Side: Actions & Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 } }}>
          <IconButton sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'flex' } }}>
            <Search size={20} />
          </IconButton>
          
          <IconButton sx={{ color: 'text.secondary' }}>
            <Badge 
              variant="dot" 
              overlap="circular" 
              sx={{ '& .MuiBadge-badge': { bgcolor: '#8B5CF6' } }}
            >
              <Bell size={20} />
            </Badge>
          </IconButton>

          <Box 
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              pl: 2, 
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer'
            }}
          >
            <Avatar 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mishtha" 
              sx={{ 
                width: 38, 
                height: 38, 
                border: '2px solid rgba(139, 92, 246, 0.5)',
                padding: '2px',
                bgcolor: 'rgba(139, 92, 246, 0.1)'
              }} 
            />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                Premium Plan
              </Typography>
              <Typography variant="body2" fontWeight="700">
                Mishtha
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;