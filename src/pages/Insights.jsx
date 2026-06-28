import React from 'react';
import { Box, Grid, Typography, Paper, Container, useTheme, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Zap, 
  Award, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

// Dummy Data for Premium Visuals
const weeklyData = [
  { name: 'Mon', focus: 4, tasks: 5 },
  { name: 'Tue', focus: 6, tasks: 8 },
  { name: 'Wed', focus: 5, tasks: 6 },
  { name: 'Thu', focus: 8, tasks: 12 },
  { name: 'Fri', focus: 7, tasks: 9 },
  { name: 'Sat', focus: 3, tasks: 4 },
  { name: 'Sun', focus: 9, tasks: 15 },
];

const categoryData = [
  { name: 'Development', value: 45, color: '#8B5CF6' },
  { name: 'Design', value: 25, color: '#3B82F6' },
  { name: 'Learning', value: 20, color: '#10B981' },
  { name: 'Meetings', value: 10, color: '#F59E0B' },
];

const Insights = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ pb: 6 }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-1px' }}>
                AI <span style={{ color: '#8B5CF6' }}>Insights</span>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Aura's analysis of your performance this week.
              </Typography>
            </Box>
            <Chip 
              icon={<Sparkles size={16} color="#8B5CF6" />} 
              label="Updated 2m ago" 
              sx={{ 
                bgcolor: 'rgba(139, 92, 246, 0.1)', 
                color: 'primary.light',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                fontWeight: 600
              }} 
            />
          </Box>

          <Grid container spacing={3}>
            {/* AI Summary Card */}
            <Grid item xs={12} lg={4}>
              <Paper
                component={motion.div}
                variants={cardVariants}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(139, 92, 246, 0.2)', color: 'primary.light' }}>
                    <Brain size={24} />
                  </Box>
                  <Typography variant="h6" fontWeight="700">Aura Executive Summary</Typography>
                </Box>
                
                <Typography variant="body1" sx={{ color: '#E5E7EB', lineHeight: 1.7 }}>
                  "Your productivity peaked on <strong>Thursday</strong> during your deep work session. You are <strong>22% more efficient</strong> when starting tasks before 10 AM. Aura suggests moving your React training to earlier in the day for maximum retention."
                </Typography>

                <Box sx={{ mt: 'auto', pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Weekly Goal Progress</Typography>
                    <Typography variant="body2" fontWeight="700">84%</Typography>
                  </Box>
                  <Box sx={{ height: 8, width: '100%', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                    <Box component={motion.div} initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1, delay: 0.5 }} sx={{ height: '100%', background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)' }} />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Main Trend Chart */}
            <Grid item xs={12} lg={8}>
              <Paper
                component={motion.div}
                variants={cardVariants}
                sx={{
                  p: 3,
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '400px'
                }}
              >
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="700">Productivity Momentum</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#8B5CF6' }} />
                      <Typography variant="caption" color="text.secondary">Focus Hours</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                      <Typography variant="caption" color="text.secondary">Tasks Done</Typography>
                    </Box>
                  </Box>
                </Box>
                
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="focus" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorFocus)" />
                    <Area type="monotone" dataKey="tasks" stroke="#3B82F6" strokeWidth={3} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Category Pie Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                component={motion.div}
                variants={cardVariants}
                sx={{
                  p: 3,
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>Work Distribution</Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 2 }}>
                  {categoryData.map((item) => (
                    <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography variant="caption" color="text.secondary">{item.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Detailed Performance Metrics */}
            <Grid item xs={12} md={6} lg={8}>
              <Grid container spacing={3}>
                {[
                  { label: 'Avg Focus Time', value: '6.4h', icon: <Clock color="#8B5CF6" />, trend: '+12%' },
                  { label: 'Completion Rate', value: '94%', icon: <Target color="#3B82F6" />, trend: '+3%' },
                  { label: 'Streak Days', value: '12', icon: <Zap color="#F59E0B" />, trend: 'Best' },
                  { label: 'AI Score', value: 'A+', icon: <Award color="#10B981" />, trend: 'Top 5%' }
                ].map((stat, i) => (
                  <Grid item xs={6} md={3} key={i}>
                    <Paper
                      component={motion.div}
                      variants={cardVariants}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>{stat.icon}</Box>
                      <Typography variant="h5" fontWeight="800">{stat.value}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">{stat.label}</Typography>
                      <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>{stat.trend}</Typography>
                    </Paper>
                  </Grid>
                ))}
                
                {/* Visual Placeholder for more charts or recommendations */}
                <Grid item xs={12}>
                  <Box 
                    sx={{ 
                      p: 3, 
                      borderRadius: '20px', 
                      background: 'rgba(139, 92, 246, 0.03)', 
                      border: '1px dashed rgba(139, 92, 246, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2
                    }}
                  >
                    <TrendingUp size={20} color="#8B5CF6" />
                    <Typography variant="body2" sx={{ color: 'primary.light', fontWeight: 600 }}>
                      Unlock deep-dive analytics by connecting your Calendar.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Insights;