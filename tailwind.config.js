module.exports = {
  theme: {
    maxHeight: {
      content: 'max-content',
    },
    maxWidth: {
      content: 'max-content',
    },
    extend: {
      colors: {
        primary: {
          100: '#a2deff',
          200: '#8ecaff',
          300: '#7ab6ff',
          400: '#66a2ff',
          500: '#528eff',
          600: '#3e7aff',
          700: '#2a66ff',
          800: '#1652f0'
        },
        darkBlue: {
          900: '#113355',
        },
        dark: {
          800: "rgba(0, 0, 0, 0.5)",
          900: "rgba(0, 0, 0, 1)"
        }
      },
      zIndex: {
        '-1': '-1',
      },
      inset: {
        0: 0,
        auto: 'auto',
        hide: '-100vh',
        1: '1em',
        2: '2em',
        3: '3em',
        4: '4em',
        5: '5em',
      },
      transitionProperty: {
        position: 'top, right, bottom, left',
      },
    },
    container: {
      center: true,
    },
  },
}