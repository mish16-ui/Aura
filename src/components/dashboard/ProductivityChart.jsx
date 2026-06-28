import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * ProductivityChart Component
 * A custom-built animated bar visualizer representing weekly activity.
 */
const ProductivityChart = () => {
  const theme = useTheme();

  // Dummy data for the last 7 days
  const data = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 85 },
    { day: 'Thu', value: 30 },
    { day: 'Fri', value: 90 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 55 },
  ];

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" fontWeight="700">Productivity Score</Typography>
          <Typography variant="caption" color="text.secondary">Weekly Activity Overview</Typography>
        </Box>
        <Typography variant="h4" fontWeight="800" sx={{ color: '#8B5CF6' }}>
          82%
        </Typography>
      </Box>

      {/* Chart Visualizer */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 2 },
          height: 200,
          px: 1
        }}
      >
        {data.map((item, index) => (
          <Box 
            key={item.day} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              flexGrow: 1,
              height: '100%'
            }}
          >
            {/* Bar Container */}
            <Box 
              sx={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'flex-end',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Box
                component={motion.div}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${item.value}%`, opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.1, 
                  type: 'spring', 
                  stiffness: 50 
                }}
                sx={{
                  width: { xs: '8px', sm: '12px', md: '16px' },
                  background: 'linear-gradient(180deg, #8B5CF6 0%, #3B82F6 100%)',
                  borderRadius: '10px 10px 4px 4px',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                  position: 'relative',
                  '&:hover': {
                    filter: 'brightness(1.2)',
                    cursor: 'pointer'
                  }
                }}
              >
                {/* Tooltip-like value (visible on hover) */}
                <Box
                  className="bar-value"
                  sx={{
                    position: 'absolute',
                    top: -25,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#8B5CF6',
                    opacity: 0.8
                  }}
                >
                  {item.value}
                </Box>
              </Box>
            </Box>
            
            {/* Day Label */}
            <Typography 
              variant="caption" 
              sx={{ 
                mt: 2, 
                fontWeight: 600, 
                color: 'text.secondary',
                fontSize: '0.7rem' 
              }}
            >
              {item.day}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ProductivityChart;
