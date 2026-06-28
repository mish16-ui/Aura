import { Box, keyframes } from '@mui/material'
import { motion } from 'framer-motion'

const breathe = keyframes`
  0%, 100% {
    opacity: 0.45;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.06);
  }
`

const coreBreathe = keyframes`
  0%, 100% {
    opacity: 0.88;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.04);
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export default function AuraOrb({ size = 160 }) {
  return (
    <Box
      component={motion.div}
      role="img"
      aria-label="Aura logo"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        position: 'relative',
        width: size,
        height: size,
        mx: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        sx={{
          width: size,
          height: size,
          overflow: 'visible',
          '& .aura-ambient': {
            transformOrigin: '50px 50px',
            animation: `${breathe} 4.5s ease-in-out infinite`,
          },
          '& .aura-core': {
            transformOrigin: '50px 50px',
            animation: `${coreBreathe} 4.5s ease-in-out infinite`,
          },
          '& .aura-ring-outer': {
            transformOrigin: '50px 50px',
            animation: `${spin} 24s linear infinite`,
          },
          '& .aura-ring-orbit': {
            transformOrigin: '50px 50px',
            animation: `${spin} 32s linear infinite reverse`,
          },
        }}
      >
        <defs>
          <radialGradient id="auraCore" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="18%" stopColor="#C4B5FD" stopOpacity="0.95" />
            <stop offset="48%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="78%" stopColor="#3B82F6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.95" />
          </radialGradient>

          <radialGradient id="auraNucleus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#BFDBFE" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
          </radialGradient>

          <linearGradient id="auraRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="auraArc" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="35%" stopColor="#A78BFA" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>

          <filter id="auraGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="auraSoftGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <g className="aura-ambient">
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="url(#auraCore)"
            opacity="0.35"
            filter="url(#auraSoftGlow)"
          />
        </g>

        <g className="aura-ring-outer">
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#auraRing)"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle
            cx="50"
            cy="6"
            r="1.1"
            fill="#C4B5FD"
            opacity="0.9"
          />
          <circle
            cx="94"
            cy="50"
            r="0.85"
            fill="#38BDF8"
            opacity="0.75"
          />
        </g>

        <g className="aura-ring-orbit">
          <path
            d="M 50 24 A 26 26 0 0 1 72 50"
            stroke="url(#auraArc)"
            strokeWidth="0.65"
            strokeLinecap="round"
          />
          <path
            d="M 72 50 A 26 26 0 0 1 50 76"
            stroke="url(#auraArc)"
            strokeWidth="0.65"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 50 76 A 26 26 0 0 1 28 50"
            stroke="url(#auraArc)"
            strokeWidth="0.65"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>

        <g className="aura-core" filter="url(#auraGlow)">
          <circle cx="50" cy="50" r="16" fill="url(#auraCore)" />
          <circle cx="50" cy="50" r="6.5" fill="url(#auraNucleus)" />
          <circle cx="50" cy="50" r="2.2" fill="#FFFFFF" opacity="0.95" />
        </g>
      </Box>
    </Box>
  )
}
