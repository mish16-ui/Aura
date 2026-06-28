import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import { Menu } from 'lucide-react';

/**
 * DashboardLayout
 * Provides the premium dark glassmorpShic background and grid structure.
 */
const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
};
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#030712', // Deepest background color
        color: 'text.primary',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Premium Animated Mesh Gradient Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            left: '-5%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)',
            filter: 'blur(100px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            right: '-5%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
            filter: 'blur(120px)',
          }}
        />
      </Box>

      {/* Persistent Sidebar */}
      <Sidebar
  isOpen={mobileOpen}
  onClose={handleDrawerToggle}
  drawerWidth={280}
/>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: '280px' }, // Offset for the fixed sidebar width
          p: { xs: 2, sm: 4, md: 6 },
          position: 'relative',
          zIndex: 1,
          height: '100vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
          },
        }}
      >
        <Box
  sx={{
    display: { xs: "flex", md: "none" },
    mb: 2,
  }}
>
  <IconButton
    onClick={handleDrawerToggle}
    sx={{
      color: "white",
      bgcolor: "rgba(255,255,255,0.05)",
    }}
  >
    <Menu size={24} />
  </IconButton>
</Box>
       
        {children}
      </Box>
    </Box>
  );
};


export default DashboardLayout;