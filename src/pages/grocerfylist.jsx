import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import '../assets/styles/grocerfylist.css';

import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import { auth, db } from '../firebase.config';

const Grocerfylist = () => {
  const ariaLabel = { 'aria-label': 'description' };
  return (
    <div id="container-grocerfy-page">
      <ThemeProvider theme={theme}>
        <h1>My Grocerfy List</h1>
        <div>
          <Input placeholder="Add ingredient" inputProps={ariaLabel} />
          <Button sx={{ width: '6rem' }} variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Grocerfylist;
