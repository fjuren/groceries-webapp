import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import '../assets/styles/grocerfylist.css';

import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { auth, db } from '../firebase.config';
import { addDoc, collection } from 'firebase/firestore';

const Grocerfylist = () => {
  // const [checkmark, setCheckmark] = useState(false);
  const [ingredient, setIngredient] = useState('');

  const ariaLabel = { 'aria-label': 'description' };

  const groceriesCollection = collection(db, 'groceries');

  const handleIngredient = (e) => {
    setIngredient(e.target.value);
  };

  const addIngredient = async () => {
    await addDoc(groceriesCollection, {
      ingredient,
      author: { id: auth.currentUser.uid, name: auth.currentUser.displayName }
    });
  };

  return (
    <div id="container-grocerfy-page">
      <ThemeProvider theme={theme}>
        <h1 className="title">My Grocerfy List</h1>
        <div className="grocerfyList-container">
          <div className="addIngredients-container">
            <Input
              placeholder="Add ingredient"
              inputProps={ariaLabel}
              onChange={(e) => handleIngredient(e)}
            />
            <Button
              sx={{ width: '6rem' }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addIngredient}>
              Add
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Grocerfylist;
