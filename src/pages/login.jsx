import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

// import { auth } from '../firebase.config';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#067A46'
    },
    secondary: {
      main: '#067A46'
    },
    error: {
      main: '#067A46'
    }
  }
});

const Login = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[2].value);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
        // sx={{
        //   border: '1px solid grey',
        //   width: 500,
        //   height: 300
        // }}
        >
          <div id="login">
            <h1>Log in</h1>
          </div>
          <form id="loginform" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                id="email-field"
                sx={{}}
                label="Email"
                placeholder="Type your email"
                variant="outlined"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                id="password-field"
                label="Password"
                type="password"
                placeholder="Type your password"
                variant="outlined"
              />
            </Stack>
            <Button sx={{ bgcolor: 'primary.main' }} type="submit" variant="contained">
              Login
            </Button>
          </form>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Login;
