import React, { useState } from 'react';
import Breadcrumb from '../../components/breadcrumb';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ClickableChips from '../../components/ClickableChips';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@emotion/react';
import theme from '../../theme';
import '../../assets/styles/createnewrecipe.css';
import ListBulletItems from '../../components/ListBulletItems';
// import { useEffect } from 'react';
import { auth, db } from '../../firebase.config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Createnewrecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chips, setChips] = useState([]);
  const [bulletItemList, setBulletItemList] = useState([]);
  const [bulletItem, setBulletItem] = useState('');
  // const [itemtypeStatusList, setItemtypeStatusList] = useState({ type: '', selected: false });
  const [renderList, setRenderList] = useState(0);

  const navigation = useNavigate();

  const parentPage = '/recipes';
  const parentPageName = 'Recipes';
  const currentPageName = 'Create your recipe';

  const chipItems = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Dessert', 'Drink'];

  const recipesCollection = collection(db, 'recipes');

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleChipClick = (type, typeStatus) => {
    chips.forEach((chip, index) => {
      if (type === chip.type) {
        chips.splice([index], 1); // prevent duplicates. Deletes the last instance if there's a match
      }
    });
    chips.push({ type, typeStatus }); // adds whatever the most recent instance is
    setChips(chips);
    // console.log(chips);
    // BUG console.logging chips, the duplicated rendering of objects is due to the useEffect in file ClickableChips.jsx. This duplication should be prevented
    // above solution may have solved the BUG. It iterates through the list, and if there's  match, it deletes the match at its index and then the new value is pushed
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await addDoc(recipesCollection, {
        title,
        description,
        types: chips,
        items: bulletItemList,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName
        },
        votes: 0,
        recipe_created: serverTimestamp()
      });
      navigation('/recipes');
    } catch (err) {
      console.log('save error => ' + err);
    }
    // console.log(chips);
  };

  const handleBulletItem = (e) => {
    e.preventDefault();
    setBulletItem(e.target.value);
  };

  const handleClear = () => {
    document.getElementById('addItemField').value = '';
  };

  const addBulletItem = (e) => {
    e.preventDefault();
    try {
      setBulletItemList(bulletItemList.concat(bulletItem));
      handleClear();
    } catch (err) {
      console.log('addBulletItem error => ' + err);
    }
  };

  const handleDeleteItem = (bulletItem) => {
    const index = bulletItemList.indexOf(bulletItem);
    if (index > -1) {
      // only splice array when item is found
      bulletItemList.splice(index, 1); // 2nd parameter means remove one item only
      setRenderList(renderList + 1);
    }
    // bulletItemList.indexOf(bulletItem).splice();
  };
  // useEffect(() => {
  //   console.log();
  // }, [renderList]);

  return (
    <div id="container-create-recipe-page">
      <ThemeProvider theme={theme}>
        <div id="container-create-recipe">
          <div id="breadcrumb">
            <Breadcrumb
              parentPageName={parentPageName}
              parentPage={parentPage}
              currentPageName={currentPageName}
            />
          </div>
          <div id="border-create-recipe">
            <div>
              <h2>Create your recipe</h2>
              <p>
                Create a recipe, save it, share it, and take a list of ingredients with you to the
                grocery store!
              </p>
            </div>
            <div>
              {/* <form onSubmit={(e) => addItem(e)}> */}
              <form id="form-create-recipe">
                <Stack spacing={2}>
                  <div>
                    <TextField
                      fullWidth
                      id="title"
                      label="Recipe Title"
                      variant="outlined"
                      onChange={(e) => handleTitle(e)}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      id="description"
                      label="Recipe Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      onChange={(e) => handleDescription(e)}
                    />
                  </div>
                  <div id="container-chips">
                    {chipItems.map((chip, index) => {
                      return (
                        <ClickableChips
                          label={chip}
                          key={index}
                          // onClick={() => handleActiveChipClick()}
                          handleChipClick={handleChipClick}
                        />
                      );
                    })}
                  </div>
                  <div id="container-addItem">
                    <div id="text-addItem">
                      <TextField
                        fullWidth
                        id="addItemField"
                        label="Add item"
                        variant="outlined"
                        onChange={(e) => handleBulletItem(e)}
                      />
                    </div>
                    <div id="btn-addItem">
                      <Button
                        sx={{ width: '6rem' }}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={(e) => addBulletItem(e)}
                        type="submit">
                        Add
                      </Button>
                    </div>
                  </div>
                  <div id="container-listItems">
                    <div>
                      {bulletItemList.map((bulletItemFromList, index) => {
                        return (
                          <div key={index}>
                            <ListBulletItems
                              bulletItemFromList={bulletItemFromList}
                              handleDeleteItem={handleDeleteItem}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div id="btn-group-create-recipe">
                    {/* <div>
                      <Button
                        id="btn-save"
                        sx={{ width: '6rem' }}
                        variant="text"
                        // startIcon={<AddIcon />}
                        // onClick={(e) => addItem(e)}
                        type="submit">
                        Share with community
                      </Button>
                    </div>
                    <div>
                      <Button
                        id="btn-save"
                        sx={{ width: '6rem' }}
                        variant="text"
                        // startIcon={<AddIcon />}
                        // onClick={(e) => addItem(e)}
                        type="submit">
                        Add to Grocerfy list
                      </Button>
                    </div> */}
                    <div>
                      <Button
                        id="btn-save"
                        sx={{ width: '6rem' }}
                        variant="contained"
                        // startIcon={<AddIcon />}
                        onClick={(e) => save(e)}
                        type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </Stack>
              </form>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Createnewrecipe;
