import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import AuraOrb from '../components/aura/AuraOrb'
import AuraBackground from '../components/layout/AuraBackground'
import {
  fadeUp,
  glassCardSx,
  glassTextFieldSx,
  gradientButtonSx,
} from '../utils/motion'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin?.()
  }

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
        maxWidth="sm"
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
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <AuraOrb size={108} />
        </Box>

        <Box
          component={motion.div}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.12}
          sx={{
            ...glassCardSx,
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 4, sm: 4.5, md: 5 },
            textAlign: 'left',
          }}
        >
          <Typography
            component={motion.h1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem' },
              mb: 0.75,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #F8FAFC 0%, #C4B5FD 45%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Welcome back
          </Typography>

          <Typography
            component={motion.p}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.28}
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mb: { xs: 3, md: 3.5 },
              fontSize: { xs: '0.9375rem', sm: '1rem' },
            }}
          >
            Sign in to continue with Aura
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box
              component={motion.div}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.34}
              sx={{ mb: 2.5 }}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={glassTextFieldSx}
              />
            </Box>

            <Box
              component={motion.div}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              sx={{ mb: 1.5 }}
            >
              <TextField
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={glassTextFieldSx}
              />
            </Box>

            <Box
              component={motion.div}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.44}
              sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}
            >
              <Link
                component="button"
                type="button"
                underline="hover"
                sx={{
                  fontSize: '0.875rem',
                  color: 'rgba(167, 139, 250, 0.9)',
                  fontWeight: 500,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#C4B5FD',
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Box
              component={motion.div}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              <Button
                component={motion.button}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                variant="contained"
                size="large"
                endIcon={<LogIn size={20} strokeWidth={2.25} />}
                sx={gradientButtonSx}
              >
                Login
              </Button>
            </Box>
          </Box>

          <Box
            component={motion.div}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.58}
            sx={{ mt: 3, textAlign: 'center' }}
          >
            <Button
              variant="text"
              sx={{
                color: 'rgba(241, 245, 249, 0.72)',
                fontWeight: 500,
                fontSize: '0.9375rem',
                '&:hover': {
                  color: '#C4B5FD',
                  backgroundColor: 'rgba(139, 92, 246, 0.08)',
                },
              }}
            >
              Create an account
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
