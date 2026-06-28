import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Stack, Chip, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

import DashboardLayout from '../layout/DashboardLayout';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import { getGeminiResponse } from '../services/geminiService';
import { useTasks } from '../hooks/useTasks'; // Added
import { formatTasksForAI } from '../utils/taskPrioritizer'; // Added

const Chat = () => {
  const { tasks } = useTasks(); // Fetch real tasks
  const [messages, setMessages] = useState([
    { id: 1, text: "Aura is synced with your dashboard. I can see your tasks and progress. How shall we optimize your day?", isAI: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (directMessage = null) => {
    const textToSend = directMessage || input.trim();
    if (!textToSend || isTyping) return;

    const userMsg = { id: Date.now(), text: textToSend, isAI: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 1. Format current tasks for AI context
      const taskContext = formatTasksForAI(tasks);
      
      // 2. Send prompt with real-time context
      const response = await getGeminiResponse(textToSend, messages, taskContext);
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, isAI: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: error.message, 
        isAI: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', pt: 2 }}>
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: '14px', background: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex' }}>
            <Brain size={26} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="800" sx={{ color: '#FFFFFF' }}>Aura Assistant</Typography>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>SYNCED WITH LOCAL DATA</Typography>
          </Box>
        </Box>

        <Box ref={scrollRef} sx={{ flexGrow: 1, overflowY: 'auto', pr: 2, mb: 2, display: 'flex', flexDirection: 'column', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' } }}>
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => <ChatBubble key={msg.id} message={msg.text} isAI={msg.isAI} />)}
            {isTyping && <TypingIndicator key="typing" />}
          </AnimatePresence>
        </Box>

        <Fade in={!isTyping}>
          <Stack direction="row" spacing={1.5} sx={{ mb: 3, overflowX: 'auto', pb: 1 }}>
            {[
              "What should I work on first?",
              "Summarize my pending tasks",
              "How is my productivity looking?"
            ].map((text) => (
              <Chip
                key={text}
                label={text}
                onClick={() => handleSend(text)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#9CA3AF',
                  '&:hover': { bgcolor: 'rgba(139, 92, 246, 0.12)', color: '#FFFFFF' }
                }}
              />
            ))}
          </Stack>
        </Fade>

        <Box sx={{ mb: 2 }}>
          <ChatInput value={input} onChange={setInput} onSend={() => handleSend()} disabled={isTyping} />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Chat;