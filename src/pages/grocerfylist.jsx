import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import '../assets/styles/grocerfylist.css';
import { useNavigate } from 'react-router-dom';

import ListCheckboxItems from '../components/ListCheckboxItems';

import Input from '@mui/material/Input';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';

import { auth, db } from '../firebase.config';
import {
  collection,
  addDoc,
  getDocs,
  // where,
  // query,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc
  // orderBy
} from 'firebase/firestore';

const Grocerfylist = ({ authStatus }) => {
  const ariaLabel = { 'aria-label': 'description' };
  let navigation = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState('');
  const [renderList, setRenderList] = useState(0);

  const groceriesCollection = collection(db, 'groceries');

  const handleItem = (e) => {
    setItem(e.target.value);
  };

  // clear input field
  // FIXME - updated to textfield so this query doesn't capture the correct field anymore
  const handleClear = () => {
    // document.getElementsByClassName('addItemField')[0].firstChild.value = '';
    setItem('');
  };

  // CREATE (crud)
  const addItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(groceriesCollection, {
        item, // STRING
        checkmark: false, // BOOL
        author: {
          id: auth.currentUser.uid, // STRING
          name: auth.currentUser.displayName // STRING
        },
        item_created: serverTimestamp() // TIMESTAMP
      });
      handleClear();
      setRenderList(renderList + 1);
    } catch (err) {
      console.log('addItem error => ' + err);
    }
  };

  // Boolean String
  const updateDB = async (checkedInChild, item_id) => {
    await updateDoc(doc(db, 'groceries', item_id), { checkmark: checkedInChild });
  };

  // UPDATE (crud)
  // Boolean String
  const handleCheckItem = async (checkedInChildComponenet, item_id) => {
    try {
      updateDB(checkedInChildComponenet, item_id);
      setRenderList(renderList + 1);
    } catch (err) {
      console.log('handleCheck error => ' + err);
    }
  };

  // DELETE (crud)
  const handleDeleteItem = async (item_id) => {
    try {
      await deleteDoc(doc(db, 'groceries', item_id));
      setRenderList(renderList + 1);
    } catch (err) {
      console.log('deleteItem error => ' + err);
    }
  };

  // READ (crud)
  useEffect(() => {
    try {
      const getItems = async () => {
        // const authoredItems = query(
        //   groceriesCollection,
        //   where('author.id', '==', auth.currentUser.uid)
        //   // orderBy('item_created')
        // );
        const querySnapshot = await getDocs(groceriesCollection);
        setItemList(
          querySnapshot.docs.map((document) => ({ ...document.data(), item_id: document.id }))
        );
      };
      getItems();
    } catch (err) {
      console.log('getItems from db error => ' + err);
    }
  }, [renderList]);

  useEffect(() => {
    if (!authStatus) {
      navigation('/');
    }
  }, []);

  return (
    <div id="container-grocerfy-page">
      <ThemeProvider theme={theme}>
        <h1 className="title">My grocerfy List</h1>
        <p>Take this list with you to the grocery store!</p>
        <div className="grocerfyList-container">
          <div className="additems-container">
            <form id="grocerfyList-form" onSubmit={(e) => addItem(e)}>
              <div>
                <TextField
                  value={item}
                  className="addItemField"
                  label="Add item"
                  inputProps={ariaLabel}
                  variant="outlined"
                  onChange={(e) => handleItem(e)}
                />
              </div>
              <div className="addItem-btn">
                <Button
                  sx={{ width: '7rem' }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={(e) => addItem(e)}
                  type="submit">
                  Add
                </Button>
              </div>
            </form>
          </div>
          <div className="item-container">
            <div>
              {itemList.map((itemFromList, index) => {
                return (
                  <div key={index}>
                    {authStatus &&
                    itemFromList.author.id === auth.currentUser.uid && (
                      <ListCheckboxItems
                        itemFromList={itemFromList}
                        handleDeleteItem={handleDeleteItem}
                        // checkmark={checkmark}
                        handleCheckItem={handleCheckItem}
                      />
                    ) ? (
                      <ListCheckboxItems
                        itemFromList={itemFromList}
                        handleDeleteItem={handleDeleteItem}
                        // checkmark={checkmark}
                        handleCheckItem={handleCheckItem}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Grocerfylist;
