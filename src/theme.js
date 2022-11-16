import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#067A46'
    },
    // secondary: {
    //   // main: '#067A46'
    // },
    error: {
      main: '#067A46'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;
