import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f5f9ff',
      100: '#e6f0ff',
      200: '#bfd4ff',
      300: '#99b9ff',
      400: '#4d82ff',
      500: '#004cff',
      600: '#0044e6',
      700: '#0033bf',
      800: '#002299',
      900: '#001166',
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme; 