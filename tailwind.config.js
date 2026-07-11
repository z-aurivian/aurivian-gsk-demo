/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'auri-bg':       'rgb(var(--auri-bg) / <alpha-value>)',
        'auri-card':     'rgb(var(--auri-card) / <alpha-value>)',
        'auri-offset':   'rgb(var(--auri-offset) / <alpha-value>)',
        'auri-text':     'rgb(var(--auri-text) / <alpha-value>)',
        'auri-muted':    'rgb(var(--auri-muted) / <alpha-value>)',
        'auri-border':   'rgb(var(--auri-border) / <alpha-value>)',
        'auri-blue':     'rgb(var(--auri-blue) / <alpha-value>)',
        'auri-graphite': 'rgb(var(--auri-graphite) / <alpha-value>)',
        'auri-ash':      'rgb(var(--auri-ash) / <alpha-value>)',
        'auri-bone':     'rgb(var(--auri-bone) / <alpha-value>)',
        /* semantic signals */
        's-urgent':   'rgb(var(--s-urgent) / <alpha-value>)',
        's-caution':  'rgb(var(--s-caution) / <alpha-value>)',
        's-new':      'rgb(var(--s-new) / <alpha-value>)',
        's-info':     'rgb(var(--s-info) / <alpha-value>)',
        's-emerging': 'rgb(var(--s-emerging) / <alpha-value>)',
        's-stable':   'rgb(var(--s-stable) / <alpha-value>)',
      },
      fontFamily: {
        michroma:   ['Michroma', 'sans-serif'],
        manrope:    ['Manrope', 'sans-serif'],
        'plex-mono': ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
