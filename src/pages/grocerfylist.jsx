import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import '../assets/styles/grocerfylist.css';

import ListControlItems from '../components/listControlItems';

import Input from '@mui/material/Input';
import { Button } from '@mui/material';
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

const Grocerfylist = () => {
  const ariaLabel = { 'aria-label': 'description' };

  const [itemList, setItemList] = useState([]);
  const [item, setitem] = useState('');
  // const [checkmark, setCheckmark] = useState(false);
  const [checkmark, setCheckmark] = useState({ checkmark: false, doc_id: '' });
  // const [idTest, setIdtest] = useState();
  const [renderList, setRenderList] = useState(0);

  const groceriesCollection = collection(db, 'groceries');

  const handleItem = (e) => {
    setitem(e.target.value);
  };

  const handleClear = () => {
    document.getElementsByClassName('addItemField')[0].firstChild.value = '';
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(groceriesCollection, {
        item,
        checkmark: checkmark.checkmark,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName
        },
        item_created: serverTimestamp()
      });
      handleClear();
      setRenderList(renderList + 1);
    } catch (err) {
      console.log('addItem error => ' + err);
    }
  };

  const handleCheck = async (checkedInChild, item_id) => {
    try {
      console.log(checkedInChild);
      console.log('before state change: ' + checkmark);
      setCheckmark({ checkmark: checkedInChild, doc_id: item_id });
    } catch (err) {
      console.log('handleCheck error => ' + err);
    }
  };

  const deleteItem = async (item_id) => {
    try {
      await deleteDoc(doc(db, 'groceries', item_id));
      setRenderList(renderList + 1);
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
  }, [renderList]);

  useEffect(() => {
    try {
      if (checkmark.doc_id !== '') {
        const updateDB = async (checkmark, item_id) => {
          console.log('updateDB checkmark state: ' + checkmark);
          await updateDoc(doc(db, 'groceries', item_id), { checkmark });
        };
        updateDB(checkmark.checkmark, checkmark.doc_id);
      }
    } catch (err) {
      console.log(err);
    }
  }, [checkmark.checkmark]);

  return (
    <div id="container-grocerfy-page">
      <ThemeProvider theme={theme}>
        <h1 className="title">My Grocerfy List</h1>
        <div className="grocerfyList-container">
          <div className="additems-container">
            <form onSubmit={(e) => addItem(e)}>
              <Input
                className="addItemField"
                placeholder="Add item"
                inputProps={ariaLabel}
                onChange={(e) => handleItem(e)}
              />
              <Button
                sx={{ width: '6rem' }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={(e) => addItem(e)}
                type="submit">
                Add
              </Button>
            </form>
          </div>
        </div>
        <div className="item-container">
          <div>
            {itemList.map((item, index) => {
              return (
                <div key={index}>
                  <ListControlItems
                    item={item}
                    deleteItem={deleteItem}
                    checkmark={checkmark.checkmark}
                    handleCheck={handleCheck}
                  />
                  {/* <div>
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
                  </div> */}
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
