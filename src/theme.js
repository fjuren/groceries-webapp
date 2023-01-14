import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#067A46'
    },
    // secondary: {
    //   // main: '#067A46'
    // },
    selected: {
      main: '#E4FABF',
      '&:hover': {
        backgroundColor: '#E4FABF'
      }
    },
    error: {
      main: '#067A46'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
  // typography: {
  //   button: {
  //     fontSize: '1rem',
  //   },
  // },
  // ListItemText: {
  //   styleOverrides: {
  //     // Name of the slot
  //     root: {
  //       // Some CSS
  //       fontSize: '1rem'
  //     }
  //   }
  // }
});

export default theme;
