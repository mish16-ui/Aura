import { createTheme } from '@mui/material/styles';

export const auraTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
      light: '#C084FC',
      dark: '#6D28D9',
    },
    secondary: {
      main: '#3B82F6',
    },
    background: {
      default: '#030712',
      paper: 'rgba(10, 11, 18, 0.95)', // 95% Opaque Dark
    },
    text: {
      primary: '#FFFFFF', // Max contrast
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(10, 11, 18, 0.95)',
          backgroundImage: 'none',
          borderRadius: '24px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '12px',
            transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(139, 92, 246, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: '#8B5CF6', // Subtle purple focus
              boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9CA3AF',
            '&.Mui-focused': {
              color: '#8B5CF6',
            },
          },
        },
      },
    },
  },
});