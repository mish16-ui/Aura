import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Checkbox, Chip, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { Clock, Trash2, AlertCircle } from 'lucide-react';
import { getDeadlineStatus } from '../../utils/deadlineHelpers';

const TaskCard = ({ task, onToggle, onDelete }) => {
  const [status, setStatus] = useState({ isApproaching: false, timeLeft: null });

  // Update countdown every minute
  useEffect(() => {
    const updateStatus = () => {
      const s = getDeadlineStatus(task.deadline, task.reminder || 0);
      setStatus(s);
    };
    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [task.deadline, task.reminder]);

  const getPriorityColor = (p) => {
    switch (p?.toLowerCase()) {
      case 'high': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' };
      case 'medium': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B' };
      default: return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' };
    }
  };

  const priorityStyle = getPriorityColor(task.priority);
  const showWarning = !task.completed && status.isApproaching;

  return (
    <Paper
      component={motion.div}
      layout
      sx={{
        p: 2, mb: 2, borderRadius: '16px',
        background: showWarning ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.02)',
        border: showWarning ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: showWarning ? '0 0 15px rgba(239, 68, 68, 0.15)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          sx={{ color: 'rgba(255, 255, 255, 0.2)', '&.Mui-checked': { color: '#8B5CF6' } }}
        />
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 600, 
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary',
            }}>
              {task.title}
            </Typography>
            {showWarning && (
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Tooltip title={`Approaching deadline: ${status.timeLeft} left`}>
                  <AlertCircle size={16} color="#EF4444" style={{ filter: 'drop-shadow(0 0 5px #EF4444)' }} />
                </Tooltip>
              </motion.div>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
            <Chip label={task.priority} size="small" sx={{ 
              height: 20, fontSize: '0.65rem', fontWeight: 800, 
              backgroundColor: priorityStyle.bg, color: priorityStyle.text, 
              border: `1px solid ${priorityStyle.text}33` 
            }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: showWarning ? '#EF4444' : 'text.secondary' }}>
              <Clock size={14} />
              <Typography variant="caption" sx={{ fontWeight: showWarning ? 700 : 400 }}>
                {status.timeLeft ? status.timeLeft : (task.duration || 'N/A')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      
      <IconButton size="small" onClick={() => onDelete(task.id)} sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: '#EF4444' } }}>
        <Trash2 size={18} />
      </IconButton>
    </Paper>
  );
};

export default TaskCard;