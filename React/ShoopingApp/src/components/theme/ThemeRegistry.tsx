'use client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], display: 'swap' });

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? resolvedTheme : 'light';
  
  const muiTheme = createTheme({
    palette: {
      mode: currentTheme === 'dark' ? 'dark' : 'light',
      primary: {
        main: '#673ab7', 
        light: '#9564e5', 
        dark: '#452187',
      },
      secondary: {
        main: '#855300', 
        light: '#fea619', 
      },
      background: {
        default: currentTheme === 'dark' ? '#2f3131' : '#f9f9f9', 
        paper: currentTheme === 'dark' ? '#1a1c1c' : '#ffffff',
      },
      text: {
        primary: currentTheme === 'dark' ? '#f0f1f1' : '#1a1c1c',
        secondary: currentTheme === 'dark' ? '#c5c5d7' : '#454654',
      },
      divider: currentTheme === 'dark' ? '#454654' : '#dadada',
    },
    typography: {
      fontFamily: inter.style.fontFamily,
      h1: { fontFamily: jakarta.style.fontFamily, fontWeight: 700, letterSpacing: '-0.01em' },
      h2: { fontFamily: jakarta.style.fontFamily, fontWeight: 700 },
      h3: { fontFamily: jakarta.style.fontFamily, fontWeight: 600 },
      h4: { fontFamily: jakarta.style.fontFamily, fontWeight: 600 },
      h5: { fontFamily: jakarta.style.fontFamily, fontWeight: 600 },
      h6: { fontFamily: jakarta.style.fontFamily, fontWeight: 600 },
      subtitle1: { fontFamily: jetbrains.style.fontFamily, fontWeight: 600 }, 
      button: { fontFamily: inter.style.fontFamily, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }, 
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none' as const,
            borderRadius: 8,
            fontWeight: 600,
            variants: [
              {
                props: { variant: 'contained', color: 'primary' },
                style: {
                  backgroundColor: '#1c33c0',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#3b4fd8',
                  },
                },
              },
              {
                props: { variant: 'contained', color: 'secondary' },
                style: {
                  backgroundColor: '#fea619',
                  color: '#684000',
                  '&:hover': {
                    backgroundColor: '#ffddb8',
                  },
                },
              },
            ],
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: currentTheme === 'dark' ? 'none' : '0 4px 12px rgba(0,0,0,0.08)',
            border: currentTheme === 'dark' ? '1px solid #454654' : '1px solid #eeeeee',
            borderRadius: 16,
          },
        },
      },
    },
  });

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
