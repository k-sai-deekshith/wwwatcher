import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#202835', // dark blue-black color
    },
    secondary: {
      main: '#ae7657', // brown color
    },
    background: {
      default: '#f9f8f6', // light gray for backgrounds
      paper: '#ffffff', // default white for paper components
    },
    text: {
      primary: '#202835', // dark color for text
      secondary: '#a5a0a0', // gray color for secondary text
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      color: '#202835',
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    h2: {
      color: '#202835',
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    body1: {
      color: '#202835',
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  },
});

export default theme;
