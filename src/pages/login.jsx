import React from 'react';
import './login.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Stack, TextField, Link, Divider, Button, Checkbox } from '@mui/material';

// import { auth } from '../firebase.config';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
const Login = () => {
  const handleCheckbox = () => {};

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };

  const handleRegularLogin = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[2].value);
  };

  const handleGoogleLogin = () => {};

  return (
    <div id="container-login-page">
      <ThemeProvider theme={theme}>
        <div id="login">
          <div id="login-title">
            <h1>Log in</h1>
          </div>
          <div id="login-options">
            <form id="login-form" onSubmit={handleRegularLogin}>
              <Stack spacing={2}>
                <TextField
                  id="email-field"
                  label="Email"
                  placeholder="Type your email"
                  variant="outlined"
                  // onChange={(e) => handleChange(e)}
                />
                <TextField
                  id="password-field"
                  label="Password"
                  type="password"
                  placeholder="Type your password"
                  variant="outlined"
                />
              </Stack>
              <div id="container-login-selections">
                <div>
                  <Checkbox onChange={handleCheckbox} sx={{ padding: 0 }} />
                </div>
                <div>
                  <label htmlFor="Keep me signed in">Keep me signed in</label>
                </div>
                <div>
                  <Link href="#">Forgot Password?</Link>
                </div>
              </div>
              <div>
                <Button
                  sx={{ bgcolor: 'primary.main', height: '50px' }}
                  type="submit"
                  variant="contained">
                  Log in
                </Button>
              </div>
            </form>
            <div id="divider">
              <Divider> or </Divider>
            </div>
            <div>
              <button
                id="google-button"
                onClick={() => {
                  handleGoogleLogin();
                }}>
                Log in with Google
              </button>
            </div>
          </div>
          <div id="alt-signup">
            <span>Don&apos;t have an account?</span>
            <Link href="/signup">Sign up</Link>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Login;
