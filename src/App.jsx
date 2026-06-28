import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { auraTheme } from './theme/auraTheme';
import FocusSession from "./pages/FocusSession";

// Pages
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Insights from './pages/Insights';
import CalendarPage from './pages/Calendar'; // We will create this next

function App() {
  return (
    <ThemeProvider theme={auraTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Navigation Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/schedule" element={<CalendarPage />} />
          <Route path="/focus-session" element={<FocusSession />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;