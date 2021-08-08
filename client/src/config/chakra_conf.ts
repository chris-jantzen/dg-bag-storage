import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  primary: {
    300: '#60a5fa',
  },
};

const styles = {
  global: {
    '*': {
      boxSizing: 'border-box',
    },
    html: {
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
    },
    body: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'font-family':
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
    },
  },
};

export const theme = extendTheme({ config, styles, colors });
