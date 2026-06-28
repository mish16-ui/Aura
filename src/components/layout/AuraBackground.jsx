import { Box } from '@mui/material'

export default function AuraBackground() {
  return (
    <>
      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 15% 10%, rgba(124, 58, 237, 0.22) 0%, transparent 55%),
            radial-gradient(ellipse 70% 55% at 85% 85%, rgba(37, 99, 235, 0.18) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
            linear-gradient(180deg, #050508 0%, #0B0D14 45%, #050508 100%)
          `,
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
