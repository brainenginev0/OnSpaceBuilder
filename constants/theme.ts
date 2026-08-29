// Powered by OnSpace.AI
export const Colors = {
  background: '#08080F',
  surface: '#10101A',
  surfaceElevated: '#16162A',
  border: '#1E1E32',
  borderBright: '#2E2E4A',

  primary: '#4F8EF7',
  primaryDim: '#1A2F5A',
  accent: '#7C3AED',
  accentDim: '#2A1060',
  neon: '#00E5FF',
  neonDim: '#003A44',

  gradient1: '#4F8EF7',
  gradient2: '#7C3AED',

  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',

  textPrimary: '#F0F0FF',
  textSecondary: '#8080AA',
  textMuted: '#40405A',
  textOnPrimary: '#FFFFFF',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Typography = {
  hero: { fontSize: 36, fontWeight: '800' as const, letterSpacing: -0.5 },
  h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.3 },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const },
  label: { fontSize: 14, fontWeight: '600' as const },
  mono: { fontSize: 13, fontWeight: '400' as const, fontFamily: 'monospace' as const },
};
