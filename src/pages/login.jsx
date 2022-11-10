import React from 'react';
import './login.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { TextField, Link, Divider } from '@mui/material';
import { Button, Checkbox } from '@mui/material';
import GoogleButton from 'react-google-button';

// import { auth } from '../firebase.config';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
  }
});

const Login = () => {
  const handleCheckbox = () => {};

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[2].value);
  };

  const handleGoogleLogin = () => {};

  return (
    <div id="login-page">
      <ThemeProvider theme={theme}>
        <div id="login">
          <div id="login-title">
            <h1>Log in</h1>
          </div>
          <div id="login-options">
            <form id="login-form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  id="email-field"
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
              <div id="signin-forgotpw-container">
                <div>
                  <Checkbox onChange={handleCheckbox} />
                  <label htmlFor="Keep me signed in">Keep me signed in</label>
                </div>
                <div>
                  <Link href="#">Forgot Password?</Link>
                </div>
              </div>
              <div>
                <Button sx={{ bgcolor: 'primary.main' }} type="submit" variant="contained">
                  Log in
                </Button>
              </div>
            </form>
            <div>
              <Divider> or </Divider>
            </div>
            <div id="google-login">
              <GoogleButton
                label="Log in with Google"
                onClick={() => {
                  handleGoogleLogin();
                }}></GoogleButton>
            </div>
          </div>
          <div id="alt-signup">
            <span>Don&apos;t have an account?</span>
            <Link href="#">Sign up</Link>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Login;
