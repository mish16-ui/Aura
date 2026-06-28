import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, Typography, IconButton, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Bell } from 'lucide-react';
import { reminderOptions } from '../../utils/deadlineHelpers';

const AddTaskDialog = ({ open, onClose, onAddTask }) => {
  const [formData, setFormData] = useState({ 
    title: '', 
    deadline: '', 
    priority: 'Medium', 
    duration: '', 
    reminder: 0 
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = () => {
    if (!formData.title) return;
    onAddTask(formData);
    setFormData({ title: '', deadline: '', priority: 'Medium', duration: '', reminder: 0 });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ component: motion.div, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, sx: { bgcolor: 'rgba(10, 11, 18, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px' } }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
            <Typography variant="h5" fontWeight="800">Create New Task</Typography>
            <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}><X size={24} /></IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 3, pt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField fullWidth label="Task Name" name="title" value={formData.title} onChange={handleChange} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Deadline" name="deadline" type="datetime-local" value={formData.deadline} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth select label="Reminder" name="reminder" value={formData.reminder} onChange={handleChange}>
                    {reminderOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth select label="Priority" name="priority" value={formData.priority} onChange={handleChange}>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Duration (e.g. 2h)" name="duration" value={formData.duration} onChange={handleChange} />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button onClick={onClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
            <Button variant="contained" onClick={handleCreate} startIcon={<Plus size={18} />} sx={{ background: 'linear-gradient(90deg, #8B5CF6 0%, #6D28D9 100%)', borderRadius: '12px', fontWeight: 700 }}>Create Task</Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AddTaskDialog;