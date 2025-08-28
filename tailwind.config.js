module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        max: '99999999',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      height: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        fb: {
          50: '#f4f5fb',
          100: '#e7ebf7',
          200: '#cad4ed',
          300: '#9cb1dd',
          400: '#6687ca',
          500: '#4267b2',
          600: '#325197',
          700: '#29417b',
          800: '#253867',
          900: '#243256',
          950: '#182039',
        },
      },
      keyframes: {
        'slide-right': { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
        'slide-top': { opacity: 0, transform: 'translate3d(0, -100%, 0)' },
      },
      animation: {
        'slide-right': 'slide-right 1s',
        'slide-top': 'slide-top 0.5s',
      },
    },
  },
  variant: {
    extend: {
      display: ['group-hover'],
      opacity: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [],
  safelist: [
    ...[
      'red',
      'rose',
      'orange',
      'yellow',
      'green',
      'sky',
      'blue',
      'indigo',
      'purple',
    ]
      .map((color) => {
        return [
          `lg:bg-${color}-300`,
          `bg-${color}-300`,
          `bg-${color}-50`,
          `hover:bg-${color}-300`,
          `focus:border-${color}-300`,
          `border-${color}-300`,
          `border-${color}-50`,
          `bg-${color}-100`,
          `hover:bg-${color}-100`,
          `bg-${color}-200`,
          `bg-${color}-400`,
          `hover:bg-${color}-400`,
          `lg:bg-${color}-400`,
          `bg-${color}-500`,
          `bg-${color}-400`,
          `focus:bg-${color}-400`,
          `border-${color}-500`,
          `hover:border-r-${color}-600`,
          `focus:border-r-${color}-600`,
        ]
      })
      .flat(),
  ],
}
