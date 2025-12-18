import { createTheme } from '@mui/material/styles';

export type BrandKey = "dominos" | "wineconnection" | "kfc";

export const themes = {
    dominos: createTheme({
        palette: {
            mode: 'light',
            primary: { main: '#E31837' },
            secondary: { main: '#00A651' },
        },
        typography: {
            fontFamily: 'Inter, Roboto, sans-serif',
            h1: { fontSize: '2.5rem', fontWeight: 700 },
        },
        shape: {
            borderRadius: 12,
        },
        spacing: 8,
        components: {
            MuiButton: {
                defaultProps: {
                    variant: 'contained',
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 24,
                        textTransform: 'none',
                    },
                },
            },
        }
    }),

    wineconnection: createTheme({
        palette: {
            mode: 'light',
            primary: { main: '#8B4513' },
            secondary: { main: '#DAA520' },
        },
        typography: {
            fontFamily: 'Inter, Roboto, sans-serif',
            h1: { fontSize: '2.5rem', fontWeight: 700 },
        },
        shape: {
            borderRadius: 12,
        },
        spacing: 8,
        components: {
            MuiButton: {
                defaultProps: {
                    variant: 'contained',
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 24,
                        textTransform: 'none',
                    },
                },
            },
        }
    }),

    kfc: createTheme({
        palette: {
            mode: 'light',
            primary: { main: '#D32638' },
            secondary: { main: '#F9CA17' },
        },
        typography: {
            fontFamily: 'Inter, Roboto, sans-serif',
            h1: { fontSize: '2.5rem', fontWeight: 700 },
        },
        shape: {
            borderRadius: 12,
        },
        spacing: 8,
        components: {
            MuiButton: {
                defaultProps: {
                    variant: 'contained',
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 24,
                        textTransform: 'none',
                    },
                },
            },
        }
    }),
} as const;

export type BrandTheme = typeof themes[keyof typeof themes];
