import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Fab, Paper, Container, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Clock, CheckCircle2, Plus, ListTodo, BarChart3, Bot } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import TaskCard from '../components/dashboard/TaskCard';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import AddTaskDialog from '../components/dashboard/AddTaskDialog';
import { useTasks } from '../hooks/useTasks';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const { tasks, addTask, toggleTask, deleteTask, stats } = useTasks();

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ pb: 8 }}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Good Evening, <span style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mishtha 👋</span>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Productivity Score: <span style={{ color: '#8B5CF6', fontWeight: 700 }}>{stats.productivity}%</span>. Focus on pending tasks to reach 100%.
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 5, borderRadius: '28px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)', border: '1px solid rgba(139, 92, 246, 0.3)', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <Typography variant="h3" fontWeight="800" sx={{ mb: 2 }}>Today's AI Plan</Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, maxWidth: '500px' }}>
                    {stats.pending > 0 ? `You have ${stats.pending} tasks pending. Start with your highest priority task now.` : "All caught up! Use the time for deep learning."}
                  </Typography>
                 <Button
  component={Link}
  to="/focus-session"
  variant="contained"
  size="large"
  startIcon={<Zap size={20} />}
  sx={{
    background: 'linear-gradient(90deg,#8B5CF6,#6D28D9)',
    px:4
  }}
>
  Start Focus Session
</Button>
  
                </Box>
                <Bot size={280} color="#fff" style={{ position: 'absolute', right: -30, bottom: -30, opacity: 0.08 }} />
              </Paper>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}><StatsCard title="Completed" value={stats.completed} icon={<CheckCircle2 />} trend="+4" isPositive={true} color="#10B981" /></Grid>
                <Grid item xs={12}><StatsCard title="Pending" value={stats.pending} icon={<ListTodo />} trend="Active" isPositive={false} color="#F59E0B" /></Grid>
                <Grid item xs={12}><StatsCard title="Productivity" value={`${stats.productivity}%`} icon={<BarChart3 />} trend="Real-time" isPositive={true} color="#8B5CF6" /></Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} xl={8}><ProductivityChart /></Grid>
            <Grid item xs={12} xl={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Today's Tasks</Typography>
                <IconButton onClick={() => setAddTaskOpen(true)} sx={{ color: '#8B5CF6' }}><Plus size={20} /></IconButton>
              </Box>
              <AnimatePresence>
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                ))}
              </AnimatePresence>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Fab onClick={() => setAddTaskOpen(true)} sx={{ position: 'fixed', bottom: 40, right: 40, background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)', color: 'white' }}>
        <Plus size={30} />
      </Fab>

      <AddTaskDialog open={isAddTaskOpen} onClose={() => setAddTaskOpen(false)} onAddTask={addTask} />
    </DashboardLayout>
  );
};

export default Dashboard;