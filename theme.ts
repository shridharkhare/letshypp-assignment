module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#283782', // Primary Blue
          dark: '#1e2a61',    // Hover Blue
          gradient: '#071a75' // Gradient End
        },
        accent: {
          blue: '#3f76f3',    // Bright Icon Blue
          amber: '#fab023',   // Speed Yellow
          orange: '#d06715'   // Highlight Orange
        },
        surface: {
          light: '#f8f9fb',   // Section BG
          dark: '#0f1729'     // Footer BG
        },
        text: {
          main: '#0e172a',    // Dark Headings
          body: '#4b5563',    // Body Gray
          muted: '#9ca3af'    // Footer/Muted Text
        }
      },
      fontFamily: {
        sans: ['"SF Pro Rounded"', 'Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft-blue': '0 4px 24px rgba(40, 55, 130, 0.08)',
        'card-hover': '0 4px 30px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'xl-card': '20px',
      }
    }
  }
}