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
      extend: {},
    },
    variants: {
        borderWidth: ['responsive', 'hover', 'focus', 'last'],
        backgroundColor: ['responsive', 'hover', 'focus', 'even', 'group-hover'],
    },
    plugins: [],
  }
