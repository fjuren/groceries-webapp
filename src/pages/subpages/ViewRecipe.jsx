import React from 'react';
import BreadCrumb from '../../components/breadcrumb';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme';
import { useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase.config';

import ListBulletItemsNoDel from '../../components/ListBulletItemNoDel';

const ViewRecipe = ({ parentPage, parentPageName }) => {
  const { state } = useLocation();

  // const parent = '/recipes';
  // const parentName = 'Recipes';
  // const parent = parentPage;
  // const parentName = parentPageName;
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

        document.getElementById('btn-add-to-list-alert').style.color = 'green';
        document.getElementById('btn-add-to-list-alert').innerHTML =
          'Ingredient(s) successfully added to your grocerfy list!';
      });
    } catch (err) {
      console.log('add recipe items to list error => ' + err);
      document.getElementById('btn-add-to-list-alert').style.color = 'red';
      document.getElementById('btn-add-to-list-alert').innerHTML =
        'Oh no! There was an issue adding ingredients to your groceryfy list. Try again later :(';
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
                      {/* <Stack direction="row" spacing={1}> */}
                      <Chip label={`${recipeType.type}`} color="primary" variant="outlined" />
                      {/* </Stack> */}
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
              <div id="btn-add-to-list">
                <Button
                  sx={{ width: '18rem' }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => addItemsToList(state.data.items)}
                  type="submit">
                  Add ingredients to my grocery list
                </Button>
              </div>
              <span id="btn-add-to-list-alert"></span>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ViewRecipe;
