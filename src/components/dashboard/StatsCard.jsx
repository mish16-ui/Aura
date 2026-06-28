import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatsCard Component
 * @param {string} title - The label of the stat
 * @param {string|number} value - The main data point
 * @param {ReactNode} icon - Lucide icon component
 * @param {string} trend - Percentage change (e.g., "+12%")
 * @param {boolean} isPositive - To determine trend color
 * @param {string} color - Primary accent color (hex)
 */
const StatsCard = ({ title, value, icon, trend, isPositive, color = '#8B5CF6' }) => {
  return (
    <Paper
      component={motion.div}
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        p: 3,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Decorative Gradient Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '14px',
              backgroundColor: `${color}15`,
              color: color,
              border: `1px solid ${color}33`,
            }}
          >
            {icon}
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 0.5,
              borderRadius: '20px',
              backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: isPositive ? '#10B981' : '#EF4444',
            }}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <Typography variant="caption" fontWeight="700">
              {trend}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
          {title}
        </Typography>
        
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-1px' }}>
          {value}
        </Typography>
      </Box>

      {/* Progress Line (Visual Detail) */}
      <Box 
        sx={{ 
          mt: 3, 
          height: 4, 
          width: '100%', 
          bgcolor: 'rgba(255,255,255,0.05)', 
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box 
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1, delay: 0.5 }}
          sx={{ 
            height: '100%', 
            background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`,
            boxShadow: `0 0 10px ${color}66`
          }} 
        />
      </Box>
    </Paper>
  );
};

export default StatsCard;