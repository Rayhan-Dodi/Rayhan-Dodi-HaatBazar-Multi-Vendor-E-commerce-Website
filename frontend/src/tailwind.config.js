/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js}',  // Update to match your project file structure
    ],
    theme: {
      extend: {
        colors: {
          neonPink: '#ff00d5',
          neonBlue: '#00c8ff',
          neonGreen: '#00ff88',
          glassBackground: 'rgba(255, 255, 255, 0.1)',
        },
        animation: {
          'fade-in': 'fadeIn 1s ease-out forwards',
          'slide-in': 'slideIn 0.5s ease-out forwards',
          'scale-up': 'scaleUp 0.5s ease-out forwards',
          'rotate-spin': 'rotateSpin 1s ease-in-out infinite',
          'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideIn: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          scaleUp: {
            '0%': { transform: 'scale(0)' },
            '100%': { transform: 'scale(1)' },
          },
          rotateSpin: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          pulseGlow: {
            '0%': { boxShadow: '0 0 10px rgba(255, 0, 213, 0.7)' },
            '50%': { boxShadow: '0 0 25px rgba(255, 0, 213, 1)' },
            '100%': { boxShadow: '0 0 10px rgba(255, 0, 213, 0.7)' },
          },
        },
        boxShadow: {
          'glass': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          'neon': '0 0 20px rgba(0, 255, 255, 0.6)',
        },
        backgroundImage: {
          'neon': 'linear-gradient(45deg, rgba(255, 0, 213, 0.8), rgba(0, 255, 255, 0.8))',
        },
        spacing: {
          'screen': '100vh',
          'lg': '2rem',
        },
        fontFamily: {
          sans: ['Helvetica', 'Arial', 'sans-serif'],
          roboto: ['Roboto', 'sans-serif'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  };
  