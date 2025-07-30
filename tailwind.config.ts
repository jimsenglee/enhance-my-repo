
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#7E57C2',
					foreground: '#FFFFFF',
					50: '#F3E5F5',
					100: '#E1BEE7',
					200: '#CE93D8',
					300: '#BA68C8',
					400: '#AB47BC',
					500: '#7E57C2',
					600: '#512DA8',
					700: '#4A148C',
					800: '#3E1065',
					900: '#2E0845'
				},
				secondary: {
					DEFAULT: '#B39DDB',
					foreground: '#4A148C'
				},
				accent: {
					DEFAULT: '#E1BEE7',
					foreground: '#4A148C'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				admin: {
					background: 'hsl(var(--admin-background))',
					foreground: 'hsl(var(--admin-foreground))',
					card: 'hsl(var(--admin-card))',
					'card-foreground': 'hsl(var(--admin-card-foreground))',
					primary: 'hsl(var(--admin-primary))',
					'primary-foreground': 'hsl(var(--admin-primary-foreground))',
					secondary: 'hsl(var(--admin-secondary))',
					'secondary-foreground': 'hsl(var(--admin-secondary-foreground))',
					accent: 'hsl(var(--admin-accent))',
					'accent-foreground': 'hsl(var(--admin-accent-foreground))',
					muted: 'hsl(var(--admin-muted))',
					'muted-foreground': 'hsl(var(--admin-muted-foreground))',
					border: 'hsl(var(--admin-border))',
					input: 'hsl(var(--admin-input))',
					sidebar: 'hsl(var(--admin-sidebar))',
					'sidebar-foreground': 'hsl(var(--admin-sidebar-foreground))',
					'sidebar-accent': 'hsl(var(--admin-sidebar-accent))',
					success: 'hsl(var(--admin-success))',
					warning: 'hsl(var(--admin-warning))',
					error: 'hsl(var(--admin-error))',
					info: 'hsl(var(--admin-info))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(126, 87, 194, 0.37)',
				'glass-lg': '0 16px 64px 0 rgba(126, 87, 194, 0.25)'
			},
			backdropBlur: {
				'glass': '40px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
