// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Asegúrate de que esto apunte a tus archivos HTML y TypeScript
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#007bff',
        'secondary-color': '#6c757d',
        'success-color': '#28a745',
        'danger-color': '#dc3545',
        'warning-color': '#ffc107',
        'info-color': '#17a2b8',
        'light-bg': '#f8f9fa',
        'dark-text': '#343a40',
        'header-bg': '#ffffff',
        'sidebar-bg': '#2d3748',
        'sidebar-text': '#a0aec0',
        'sidebar-active-bg': '#4299e1',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
