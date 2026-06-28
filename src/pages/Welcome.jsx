import { Box, Button, Container, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AuraOrb from '../components/aura/AuraOrb'
import AuraBackground from '../components/layout/AuraBackground'
import { fadeUp, glassCardSx, gradientButtonSx } from '../utils/motion'

export default function Welcome({ onGetStarted }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3 },
        py: { xs: 6, md: 8 },
      }}
    >
      <AuraBackground />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Box
          component={motion.div}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          sx={{ mb: { xs: 4, md: 5 } }}
        >
          <AuraOrb size={140} />
        </Box>

        <Box
          component={motion.div}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          sx={{
            ...glassCardSx,
            px: { xs: 3, sm: 5, md: 6 },
            py: { xs: 4, sm: 5, md: 6 },
          }}
        >
          <Typography
            component={motion.h1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.25rem', md: '3.75rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #F8FAFC 0%, #C4B5FD 45%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Meet Aura
          </Typography>

          <Typography
            component={motion.p}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 520,
              mx: 'auto',
              mb: { xs: 4, md: 5 },
              fontSize: { xs: '1rem', sm: '1.0625rem', md: '1.125rem' },
            }}
          >
            Your AI Productivity Partner that plans, reminds, and helps you finish
            work before deadlines.
          </Typography>

          <Box
            component={motion.div}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            <Button
              component={motion.button}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              variant="contained"
              size="large"
              onClick={onGetStarted}
              endIcon={<ArrowRight size={20} strokeWidth={2.25} />}
              sx={{
                ...gradientButtonSx,
                width: 'auto',
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
