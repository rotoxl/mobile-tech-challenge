import { Dimensions } from 'react-native';

export enum Spacing {
  none = 0,
  s = 1,
  m = 2,
  l = 4,
  xl = 8,
}

const theme = {
  palette: {
    primary: {
      main: '#FF5500',
      light: '#FD6E35',
      dark: '#CC4400',
    },
    secondary: {
      main: '#FF5500',
      light: '#FD6E35',
      dark: '#CC4400',
    },
    attention: {
      main: '#D64242',
      light: '#F04A4A',
      dark: '#BD3A3A',
    },
    background: {
      body: '#161616',
      base: '#1F1F1F',
      alt1: '#303030',
      alt2: '#484848',
    },
    text: {
      primary: '#FFF',
      secondary: '#484848',
    },
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
  spacing: (multiplier: Spacing = 1) => `${4 * multiplier}px`,
  borderRadius: '4px',
  typography: {
    h1: {
      'font-weight': 'bold',
      'font-size': '68px',
    },
    h2: {
      'font-weight': 'bold',
      'font-size': '50px',
    },
    h3: {
      'font-weight': 'bold',
      'font-size': '38px',
    },
    h4: {
      'font-weight': 'bold',
      'font-size': '28px',
    },
    h5: {
      'font-weight': 'bold',
      'font-size': '22px',
    },
    h6: {
      'font-weight': 'bold',
      'font-size': '16px',
    },
    body: {
      'font-weight': 'normal',
      'font-size': '14px',
    },
    button: {
      'font-weight': 'bold',
      'font-size': '14px',
      'text-transform': 'uppercase',
    },
  },
  breakpoints: {
    s: '480px',
    m: '768px',
    l: '992px',
    xl: '1200px',
    xxl: '1620px',
  },
};

export const getBreakpointKey = (screenWidth: number) => {
  const entries = Object.entries(theme.breakpoints);

  const breakpoints = entries.map((entry) => {
    const key = entry[0];
    const value = Number(entry[1].replace('px', ''));
    return { key, value };
  });

  const breakpoint = breakpoints
    .map((b, index) => {
      if (screenWidth <= b.value) {
        return breakpoints[index > 0 ? index - 1 : index];
      }
      return undefined;
    })
    .filter((b) => b !== undefined)[0];

  return breakpoint ? breakpoint.key : 'xxl';
};

const { width, height } = Dimensions.get('window');
export const screenWidth = width;
export const screenHeight = height;

export default theme;
