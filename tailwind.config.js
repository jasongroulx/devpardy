const { colors } = require('tailwindcss/defaultTheme');
module.exports = {
    purge: {
      content: [
        './resources/**/*.antlers.html',
        './resources/**/*.blade.php',
        './content/**/*.md'
      ]
    },
    important: true,
    theme: {
      extend: {
        colors: {
          purple: {
            ...colors.purple,
            '600': '#332246',
            '700': '#7E2DA3',
            '800': '#1B092F',
            '900': '#1B0536',
          },
        },
      },
    },
    variants: {
      borderWidth: ['responsive', 'hover', 'focus', 'last'],
      backgroundColor: ['responsive', 'hover', 'focus', 'even', 'group-hover'],
      borderOpacity: ['responsive', 'hover', 'focus', 'even', 'group-hover'],
    },
    plugins: [],
  }
