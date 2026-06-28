import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles 
} from 'lucide-react';

const menuItems = [
  { text: 'Overview', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
  { text: 'AI Chat', icon: <MessageSquare size={22} />, path: '/chat' },
  { text: 'Schedule', icon: <Calendar size={22} />, path: '/schedule' },
  { text: 'Insights', icon: <BarChart3 size={22} />, path: '/insights' },
];

const Sidebar = ({ isOpen, onClose, drawerWidth = 280 }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
      {/* Brand Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6, px: 1 }}>
        <Box 
          sx={{ 
            width: 42, height: 42, 
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
          }}
        >
          <Sparkles color="white" size={24} />
        </Box>
        <Typography variant="h5" fontWeight="800" sx={{ letterSpacing: '-1px', color: 'white' }}>
          AURA
        </Typography>
      </Box>

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  backgroundColor: isActive ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent',
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#FFFFFF'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 45, 
                  color: isActive ? '#8B5CF6' : 'inherit',
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isActive ? 700 : 500 }} 
                />
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    style={{ 
                      width: 4, height: 18, backgroundColor: '#8B5CF6', 
                      borderRadius: 4, position: 'absolute', right: 8 
                    }} 
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Section */}
      <Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />
        <List>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: '12px', color: '#9CA3AF' }}>
              <ListItemIcon sx={{ minWidth: 45, color: 'inherit' }}>
                <Settings size={22} />
              </ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: '12px', color: '#EF4444' }}>
              <ListItemIcon sx={{ minWidth: 45, color: 'inherit' }}>
                <LogOut size={22} />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={isOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'rgba(10, 11, 18, 0.95)', // Matches your new design system
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'white',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;