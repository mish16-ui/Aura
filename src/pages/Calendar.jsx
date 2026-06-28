import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Chip
} from "@mui/material"; // Icons imported directly in MUI components below
import { 
  Sparkles, 
  Clock, 
  Calendar as CalendarIcon,  
  Zap,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layout/DashboardLayout';
import { useTasks } from '../hooks/useTasks';

const CalendarPage = () => {
  const { tasks } = useTasks();

  // Logic: Filter pending tasks and sort by nearest deadline
  const scheduleTasks = useMemo(() => {
    return tasks
      .filter(t => !t.completed)
      .sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
  }, [tasks]);

  const topTask = scheduleTasks[0];

  const getPriorityColor = (p) => {
    switch (p?.toLowerCase()) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      default: return '#10B981';
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ py: 4 }}
        >
          {/* Page Header */}
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5, borderRadius: '12px', 
              bgcolor: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' 
            }}>
              <CalendarIcon size={28} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-1px' }}>
                Smart <span style={{ color: '#8B5CF6' }}>Schedule</span>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                AI-optimized timeline based on your priorities and deadlines.
              </Typography>
            </Box>
          </Box>

          {/* 1. Aura AI Recommendation Card */}
          {topTask && (
            <Paper
              component={motion.div}
              whileHover={{ scale: 1.01 }}
              sx={{
                p: 4, mb: 6,
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Sparkles size={18} color="#C084FC" />
                  <Typography variant="subtitle2" sx={{ color: '#C084FC', fontWeight: 800, letterSpacing: 1 }}>
                    AURA RECOMMENDATION
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight="700" gutterBottom>
                  Focus on "{topTask.title}" first.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '600px' }}>
                  This task has your nearest deadline. Starting now ensures you stay ahead of your {topTask.priority} priority commitments.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Chip 
                    label="Highest Impact" 
                    sx={{ bgcolor: 'rgba(139, 92, 246, 0.2)', color: '#C084FC', fontWeight: 700 }} 
                  />
                  <Chip 
                    label={`Est: ${topTask.duration || 'N/A'}`} 
                    variant="outlined" 
                    sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'white' }} 
                  />
                </Box>
              </Box>
              <Zap size={120} color="#8B5CF6" style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }} />
            </Paper>
          )}

          {/* 2. Vertical Timeline */}
          <Box sx={{ position: 'relative', ml: { xs: 2, md: 4 } }}>
            {/* The Vertical Line */}
            <Box sx={{ 
              position: 'absolute', left: 0, top: 0, bottom: 0, 
              width: '2px', background: 'linear-gradient(180deg, #8B5CF6 0%, rgba(139, 92, 246, 0) 100%)',
              opacity: 0.3
            }} />

            {scheduleTasks.length > 0 ? (
              scheduleTasks.map((task, index) => (
                <Box 
                  key={task.id}
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  sx={{ position: 'relative', mb: 4, pl: 6 }}
                >
                  {/* Timeline Dot */}
                  <Box sx={{ 
                    position: 'absolute', left: -6, top: 24, 
                    width: 14, height: 14, borderRadius: '50%', 
                    bgcolor: index === 0 ? '#8B5CF6' : '#1f2937',
                    border: `3px solid ${index === 0 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: index === 0 ? '0 0 10px #8B5CF6' : 'none',
                    zIndex: 2
                  }} />

                  {/* Task Card */}
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { xs: 'flex-start', md: 'center' },
                      justifyContent: 'space-between',
                      gap: 2,
                      transition: '0.3s',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderColor: 'rgba(139, 92, 246, 0.2)',
                      }
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography variant="h6" fontWeight="700">
                          {task.title}
                        </Typography>
                        <Chip 
                          label={task.priority} 
                          size="small" 
                          sx={{ 
                            height: 20, fontSize: '0.65rem', fontWeight: 900, 
                            bgcolor: 'transparent', border: `1px solid ${getPriorityColor(task.priority)}`, 
                            color: getPriorityColor(task.priority) 
                          }} 
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                          <CalendarIcon size={14} />
                          <Typography variant="caption">
                            {task.deadline ? new Date(task.deadline).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'No Deadline'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                          <Clock size={14} />
                          <Typography variant="caption">{task.duration || 'N/A'}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {index === 0 && (
                        <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, bgcolor: 'rgba(16, 185, 129, 0.1)', px: 1.5, py: 0.5, borderRadius: '20px' }}>
                          NEXT UP
                        </Typography>
                      )}
                      <ChevronRight size={20} color="rgba(255,255,255,0.2)" />
                    </Box>
                  </Paper>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 10, opacity: 0.5 }}>
                <Typography variant="h6">No pending tasks to schedule.</Typography>
                <Typography variant="body2">Add tasks from the dashboard to see your timeline.</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default CalendarPage;