import React from 'react';
import BreadCrumb from '../../components/breadcrumb';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme';
import { useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase.config';

import ListBulletItemsNoDel from '../../components/ListBulletItemNoDel';

const ViewMyRecipe = () => {
  const { state } = useLocation();

  const parentPage = '/recipes';
  const parentPageName = 'Recipes';
  const currentPageName = `${state.data.title}`;

  const groceriesCollection = collection(db, 'groceries');

  const addItemsToList = async (recipeItems) => {
    try {
      await recipeItems.forEach((item) => {
        addDoc(groceriesCollection, {
          item: item,
          checkmark: false,
          author: {
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName
          },
          item_created: serverTimestamp()
        });
      });
    } catch (err) {
      console.log('add recipe items to list error => ' + err);
    }
  };

  return (
    <div id="container-view-recipe-page">
      <ThemeProvider theme={theme}>
        <div id="container-view-recipe">
          <div id="breadcrumb">
            <BreadCrumb
              parentPageName={parentPageName}
              parentPage={parentPage}
              currentPageName={currentPageName}
            />
          </div>
          <div id="border-view-recipe">
            <div>
              <h2>{state.data.title}</h2>
            </div>
            <div>
              {state.data.types.map((recipeType, index) => {
                if (recipeType.typeStatus) {
                  return (
                    <div key={index}>
                      <Stack direction="row" spacing={1}>
                        <Chip label={`${recipeType.type}`} color="primary" variant="outlined" />
                      </Stack>
                    </div>
                  );
                }
              })}
            </div>
            <div>
              <p>{state.data.description}</p>
            </div>
            <div>
              <h3>Ingredients list</h3>
            </div>
            <div>
              {state.data.items.map((recipeItem, index) => {
                return (
                  <div key={index}>
                    <ListBulletItemsNoDel bulletItemFromList={recipeItem} />
                  </div>
                );
              })}
            </div>
            <div>
              <div>
                <Button
                  sx={{ width: '13rem' }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => addItemsToList(state.data.items)}
                  type="submit">
                  Add to my grocery list
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ViewMyRecipe;
