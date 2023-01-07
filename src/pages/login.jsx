import React from 'react';
import '../assets/styles/login.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { Link } from '@mui/material';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import { Checkbox } from '@mui/material';
import { auth, db } from '../firebase.config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

const Login = ({ authStatus }) => {
  const handleCheckbox = () => {};

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };
  let navigation = useNavigate();

  const handleRegularLogin = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[2].value);
    const userLogin = document.getElementById('login-form');
    const email = userLogin['email-field'].value;
    const password = userLogin['password-field'].value;

    try {
      signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        const user = userCredential.user;
        const nameSplit = user.displayName.split(/(\s+)/).filter(function (e) {
          return e.trim().length > 0;
        });
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(doc(db, 'users', user.uid), {
            last_login: serverTimestamp()
          });
        } else {
          await setDoc(doc(db, 'users', user.uid), {
            first_name: nameSplit[0],
            last_name: nameSplit[1],
            email: user.email,
            account_created: serverTimestamp(),
            last_login: serverTimestamp()
          });
        }
        localStorage.setItem('authStatus', true);
        authStatus(true);
        navigation('/');
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('error code: ' + errorCode);
      console.log('error message: ' + errorMessage);

      // document.getElementById('errorCode').textContent = `${errorCode}`;
      // document.getElementById('errorMessage').textContent = `${errorMessage}`;
      // console.log(errorCode);
      // console.log(errorMessage);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      signInWithPopup(auth, provider).then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const nameSplit = user.displayName.split(/(\s+)/).filter(function (e) {
          return e.trim().length > 0;
        });

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(doc(db, 'users', user.uid), {
            last_login: serverTimestamp()
          });
        } else {
          await setDoc(doc(db, 'users', user.uid), {
            first_name: nameSplit[0],
            last_name: nameSplit[1],
            email: user.email,
            account_created: serverTimestamp(),
            last_login: serverTimestamp(),
            liked_recipes: [],
            disliked_recipes: []
          });
        }
        localStorage.setItem('authStatus', true);
        authStatus(true);
        navigation('/');
      });
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // document.getElementById('errorGCode').textContent = `${errorCode}`;
      // document.getElementById('errorGMessage').textContent = `${errorMessage}`;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  return (
    <div id="container-login-page">
      <ThemeProvider theme={theme}>
        <div id="login">
          <div id="login-title">
            <h1>Log in</h1>
          </div>
          <div id="login-options">
            <form id="login-form">
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
                  // type="submit"
                  variant="contained"
                  onClick={(e) => {
                    handleRegularLogin(e);
                  }}>
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
                onClick={(e) => {
                  handleGoogleLogin(e);
                }}>
                Log in with Google
              </button>
            </div>
          </div>
          <div id="alt-signup">
            <span>Don&apos;t have an account? </span>
            <Link href="/signup">Sign up</Link>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Login;
