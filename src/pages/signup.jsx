import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Stack, TextField, Link, Button, Checkbox } from '@mui/material';
import { auth, db } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const Signup = ({ authStatus }) => {
  const handleCheckbox = () => {};

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };
  let navigation = useNavigate();

  const handleRegularSignup = async (e) => {
    e.preventDefault();

    const userLogin = document.getElementById('signup-form');
    const fname = userLogin['fname-field'].value;
    const lname = userLogin['lname-field'].value;
    const email = userLogin['email-field'].value;
    const password = userLogin['password-field'].value;

    try {
      createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // Assign first and last names to auth user
        await updateProfile(auth.currentUser, {
          displayName: fname + ' ' + lname
        })
          .then(() => {
            console.log('Name added!');
          })
          .catch((error) => {
            console.log(error);
          });

        await setDoc(doc(db, 'users', user.uid), {
          first_name: fname,
          last_name: lname,
          email: email,
          account_created: serverTimestamp(),
          last_login: serverTimestamp()
        });

        authStatus(true);
        navigation('/');
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('error code: ' + errorCode);
      console.log('error message: ' + errorMessage);
    }
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
                  id="fname-field"
                  label="First name"
                  placeholder="Type your first name"
                  variant="outlined"
                  // onChange={(e) => handleChange(e)}
                />
                <TextField
                  id="lname-field"
                  label="Last name"
                  placeholder="Type your last name"
                  variant="outlined"
                  // onChange={(e) => handleChange(e)}
                />
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
