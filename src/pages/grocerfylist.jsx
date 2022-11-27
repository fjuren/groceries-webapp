import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import '../assets/styles/grocerfylist.css';

import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { auth, db } from '../firebase.config';
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  serverTimestamp
  // orderBy
} from 'firebase/firestore';

const Grocerfylist = () => {
  const ariaLabel = { 'aria-label': 'description' };

  // const [itemList] = useState([]);
  const [item, setitem] = useState('');
  const [checkmark] = useState(false);

  const groceriesCollection = collection(db, 'groceries');

  const handleitem = (e) => {
    setitem(e.target.value);
  };

  const q = query(
    groceriesCollection,
    where('author.id', '==', auth.currentUser.uid)
    // orderBy('item_created')
  );

  const additem = async () => {
    try {
      await addDoc(groceriesCollection, {
        item,
        checkmark,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName
        },
        item_created: serverTimestamp()
      });
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        // setItemList(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="container-grocerfy-page">
      <ThemeProvider theme={theme}>
        <h1 className="title">My Grocerfy List</h1>
        <div className="grocerfyList-container">
          <div className="additems-container">
            <Input placeholder="Add item" inputProps={ariaLabel} onChange={(e) => handleitem(e)} />
            <Button
              sx={{ width: '6rem' }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={additem}>
              Add
            </Button>
          </div>
        </div>
        {/* <div>
          {itemList.map((item) => {
            <h3>{item}</h3>;
          })}
        </div> */}
      </ThemeProvider>
    </div>
  );
};

export default Grocerfylist;
