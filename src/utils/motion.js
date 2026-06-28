export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const glassCardSx = {
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: { xs: '24px', md: '28px' },
  boxShadow: `
    0 24px 80px rgba(0, 0, 0, 0.35),
    0 0 60px rgba(139, 92, 246, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.06)
  `,
}

export const gradientButtonSx = {
  px: { xs: 4, sm: 5 },
  py: { xs: 1.35, sm: 1.5 },
  fontSize: { xs: '0.9375rem', sm: '1rem' },
  width: '100%',
  background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
  boxShadow: `
    0 8px 32px rgba(139, 92, 246, 0.4),
    0 0 24px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  '&:hover': {
    background: 'linear-gradient(135deg, #9333EA 0%, #6366F1 50%, #2563EB 100%)',
    boxShadow: `
      0 12px 40px rgba(139, 92, 246, 0.5),
      0 0 32px rgba(59, 130, 246, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.25)
    `,
  },
}

export const glassTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.18)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.15)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(139, 92, 246, 0.55)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(241, 245, 249, 0.65)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#A78BFA',
  },
}
