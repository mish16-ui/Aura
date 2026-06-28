import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Container, Typography, Button, Paper, MenuItem, TextField, 
  IconButton, CircularProgress, Grid, Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, CheckCircle2, Zap, ArrowLeft, Settings2, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import { useTasks } from '../hooks/useTasks';

const FocusSession = () => {
  const { tasks, toggleTask } = useTasks();
  
  // States
  const [step, setStep] = useState('select'); // select, recommend, customize, active, finished
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [sessionConfig, setSessionConfig] = useState({ focusTime: 25, breakTime: 5, cycles: 1 });
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const pendingTasks = tasks.filter(t => !t.completed);
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  // Parse Duration and generate Recommendation
  const getRecommendation = (durationStr) => {
    if (!durationStr) return { focusTime: 25, breakTime: 5, cycles: 1 };
    const num = parseFloat(durationStr);
    const mins = durationStr.toLowerCase().includes('h') ? num * 60 : num;

    if (mins <= 60) return { focusTime: 25, breakTime: 5, cycles: 1 };
    if (mins <= 120) return { focusTime: 45, breakTime: 10, cycles: 2 };
    return { focusTime: 50, breakTime: 10, cycles: 4 };
  };

  const handleTaskSelect = () => {
    const rec = getRecommendation(selectedTask?.duration);
    setSessionConfig(rec);
    setStep('recommend');
  };

  const startTimer = (config) => {
    setSessionConfig(config);
    setTimeLeft(config.focusTime * 60);
    setStep('active');
    setIsActive(true);
  };

  // Timer Effect
  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setStep('finished');
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused, timeLeft]);

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setStep('select');
    setSelectedTaskId('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((sessionConfig.focusTime * 60 - timeLeft) / (sessionConfig.focusTime * 60)) * 100;

  // Shared Form Style
  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: 'rgba(255,255,255,0.03)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton component={Link} to="/dashboard" sx={{ color: 'text.secondary' }}>
            <ArrowLeft />
          </IconButton>
          <Typography variant="h4" fontWeight="800">Focus <span style={{ color: '#8B5CF6' }}>Session</span></Typography>
        </Box>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <Paper key="select" component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} sx={{ p: 5, borderRadius: '28px', background: 'rgba(10, 11, 18, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', textAlign: 'center' }}>
              <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'rgba(139, 92, 246, 0.1)', width: 'fit-content', mx: 'auto', mb: 3 }}><Zap size={40} color="#8B5CF6" /></Box>
              <Typography variant="h5" fontWeight="700" gutterBottom>Analyze Task Flow</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Select a task and Aura will recommend the best focus strategy.</Typography>
              <TextField select fullWidth label="Choose a Task" value={selectedTaskId} onChange={(e) => setSelectedTaskId(e.target.value)} sx={{ ...inputStyle, mb: 4 }}>
                {pendingTasks.map((task) => (
                  <MenuItem key={task.id} value={task.id}>{task.title} ({task.duration || 'N/A'})</MenuItem>
                ))}
              </TextField>
              <Button fullWidth size="large" variant="contained" disabled={!selectedTaskId} onClick={handleTaskSelect} sx={{ py: 2, borderRadius: '16px', background: 'linear-gradient(90deg, #8B5CF6 0%, #6D28D9 100%)', fontWeight: 700 }}>Analyze & Continue</Button>
            </Paper>
          )}

          {step === 'recommend' && (
            <Paper key="recommend" component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} sx={{ p: 5, borderRadius: '28px', background: 'rgba(10, 11, 18, 0.95)', border: '1px solid rgba(139, 92, 246, 0.5)', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Sparkles size={150} color="#8B5CF6" /></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Sparkles size={24} color="#C084FC" />
                <Typography variant="h5" fontWeight="800">✨ Aura Recommendation</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Based on your task duration of <b>{selectedTask?.duration}</b>, Aura suggests:</Typography>
              
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {[
                  { label: 'Focus Time', value: `${sessionConfig.focusTime} min` },
                  { label: 'Break Time', value: `${sessionConfig.breakTime} min` },
                  { label: 'Cycles', value: sessionConfig.cycles }
                ].map((item) => (
                  <Grid item xs={4} key={item.label}>
                    <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary" display="block">{item.label}</Typography>
                      <Typography variant="h6" fontWeight="800" color="primary.light">{item.value}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button fullWidth variant="outlined" startIcon={<Settings2 size={18} />} onClick={() => setStep('customize')} sx={{ borderRadius: '12px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Customize Timer</Button>
                <Button fullWidth variant="contained" onClick={() => startTimer(sessionConfig)} sx={{ borderRadius: '12px', background: 'linear-gradient(90deg, #8B5CF6 0%, #6D28D9 100%)' }}>Use Recommendation</Button>
              </Box>
            </Paper>
          )}

          {step === 'customize' && (
            <Paper key="customize" component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} sx={{ p: 5, borderRadius: '28px', background: 'rgba(10, 11, 18, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <Typography variant="h5" fontWeight="800" sx={{ mb: 4 }}>Adjust Parameters</Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Focus (min)" type="number" value={sessionConfig.focusTime} onChange={(e) => setSessionConfig({...sessionConfig, focusTime: parseInt(e.target.value)})} sx={inputStyle} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Break (min)" type="number" value={sessionConfig.breakTime} onChange={(e) => setSessionConfig({...sessionConfig, breakTime: parseInt(e.target.value)})} sx={inputStyle} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Cycles" type="number" value={sessionConfig.cycles} onChange={(e) => setSessionConfig({...sessionConfig, cycles: parseInt(e.target.value)})} sx={inputStyle} />
                </Grid>
              </Grid>
              <Button fullWidth variant="contained" onClick={() => startTimer(sessionConfig)} sx={{ py: 1.5, borderRadius: '12px', background: 'linear-gradient(90deg, #8B5CF6 0%, #6D28D9 100%)' }}>Save & Start Session</Button>
            </Paper>
          )}

          {step === 'active' && (
            <Paper key="timer" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ p: 5, borderRadius: '28px', background: 'rgba(10, 11, 18, 0.95)', border: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.light', fontWeight: 700, mb: 4, letterSpacing: 2 }}>FOCUSING: {selectedTask?.title}</Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex', mb: 6 }}>
                <CircularProgress variant="determinate" value={100} size={280} thickness={2} sx={{ color: 'rgba(255,255,255,0.05)' }} />
                <CircularProgress variant="determinate" value={progress} size={280} thickness={2} sx={{ color: '#8B5CF6', position: 'absolute', left: 0, strokeLinecap: 'round', filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))' }} />
                <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Typography variant="h2" fontWeight="900">{formatTime(timeLeft)}</Typography>
                  <Typography variant="body2" color="text.secondary">Cycle 1 of {sessionConfig.cycles}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <IconButton onClick={handleReset} sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 2 }}><RotateCcw color="#9CA3AF" /></IconButton>
                <Button variant="contained" onClick={() => setIsPaused(!isPaused)} sx={{ px: 6, borderRadius: '50px', bgcolor: isPaused ? '#10B981' : 'rgba(139, 92, 246, 0.2)', color: isPaused ? 'white' : '#8B5CF6', border: '1px solid rgba(139, 92, 246, 0.5)' }}>
                  {isPaused ? <Play fill="currentColor" /> : <Pause fill="currentColor" />}
                  <Typography variant="button" sx={{ ml: 1, fontWeight: 800 }}>{isPaused ? 'Resume' : 'Pause'}</Typography>
                </Button>
              </Box>
            </Paper>
          )}

          {step === 'finished' && (
            <Paper key="finished" component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ p: 6, borderRadius: '28px', background: 'rgba(10, 11, 18, 0.95)', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
              <CheckCircle2 size={80} color="#10B981" style={{ marginBottom: '24px' }} />
              <Typography variant="h3" fontWeight="900" gutterBottom>Session Complete!</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>Excellent work. You completed your focus block.</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button fullWidth variant="outlined" onClick={handleReset} sx={{ py: 1.5, borderRadius: '12px', color: 'white' }}>Dismiss</Button>
                <Button fullWidth variant="contained" onClick={() => { toggleTask(selectedTaskId); handleReset(); }} sx={{ py: 1.5, borderRadius: '12px', bgcolor: '#10B981' }}>Mark Task Done</Button>
              </Box>
            </Paper>
          )}
        </AnimatePresence>
      </Container>
    </DashboardLayout>
  );
};

export default FocusSession;