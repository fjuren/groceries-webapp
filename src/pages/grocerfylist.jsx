import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import '../assets/styles/grocerfylist.css';

import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { auth, db } from '../firebase.config';
import {
  collection,
  addDoc,
  getDocs,
  // where,
  // query,
  serverTimestamp,
  deleteDoc,
  doc
  // orderBy
} from 'firebase/firestore';

const Grocerfylist = () => {
  const ariaLabel = { 'aria-label': 'description' };

  const [itemList, setItemList] = useState(['item']);
  const [item, setitem] = useState('');
  const [checkmark] = useState(false);

  const groceriesCollection = collection(db, 'groceries');

  const handleitem = (e) => {
    setitem(e.target.value);
  };

  const addItem = async () => {
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
    } catch (err) {
      console.log('addItem error => ' + err);
    }
  };

  const deleteItem = async (item_id) => {
    try {
      await deleteDoc(doc(db, 'groceries', item_id));
      // console.log('delete item', e, item_id);
    } catch (err) {
      console.log('deleteItem error => ' + err);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      // const authoredItems = query(
      //   groceriesCollection,
      //   where('author.id', '==', auth.currentUser.uid)
      //   // orderBy('item_created')
      // );
      const querySnapshot = await getDocs(groceriesCollection);
      // console.log('querySnapshot.docs => ' + querySnapshot.docs);
      setItemList(
        querySnapshot.docs.map((document) => ({ ...document.data(), item_id: document.id }))
      );
    };
    getItems();
  }, [deleteItem]);

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
              onClick={addItem}>
              Add
            </Button>
          </div>
        </div>
        <div className="item-container">
          <div>
            {itemList.map((item, index) => {
              return (
                <div key={index}>
                  <div>
                    <h3>{item.item}</h3>
                  </div>
                  <div>
                    <Button
                      sx={{ width: '6rem', backgroundColor: 'red' }}
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteItem(item.item_id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Grocerfylist;
