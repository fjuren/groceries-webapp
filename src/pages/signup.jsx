import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Stack, TextField, Link, Button, Checkbox } from '@mui/material';
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const handleCheckbox = () => {};

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };
  let navigation = useNavigate();

  const handleRegularSignup = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[2].value);
    const userLogin = document.getElementById('signup-form');
    const email = userLogin['email-field'].value;
    const password = userLogin['password-field'].value;
    console.log(userLogin);
    console.log(email);
    console.log(password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation('/');
        // authStatus(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('error code: ' + errorCode);
        console.log('error message: ' + errorMessage);

        // document.getElementById('errorCode').textContent = `${errorCode}`;
        // document.getElementById('errorMessage').textContent = `${errorMessage}`;
        // console.log(errorCode);
        // console.log(errorMessage);
      });
  };

  return (
    <div id="container-signup-page">
      <ThemeProvider theme={theme}>
        <div id="signup">
          <div id="signup-title">
            <h1>Create your Grocerfy account</h1>
          </div>
          <div id="signup-options">
            <form id="signup-form">
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
              <div id="container-signup-selections">
                <div>
                  <Checkbox onChange={handleCheckbox} sx={{ padding: 0 }} />
                </div>
                <div>
                  <label htmlFor="Keep me signed in">Keep me signed in</label>
                </div>
              </div>
              <div>
                <Button
                  sx={{ bgcolor: 'primary.main', height: '50px' }}
                  //   type="submit"
                  variant="contained"
                  onClick={(e) => {
                    handleRegularSignup(e);
                  }}>
                  Create account
                </Button>
                <button
                  id="google-button"
                  onClick={(e) => {
                    handleRegularSignup(e);
                  }}>
                  Fake signup
                </button>
              </div>
            </form>
          </div>
          <div>
            <Link href="/login">Return back to login</Link>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Signup;
