import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MultiActionAreaCard from '../components/Multiactionareacard';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const Recipes = () => {
  const navigation = useNavigate();
  const recipesCollection = collection(db, 'recipes');

  const [recipesList, setRecipesList] = useState([]);
  const [renderList, setRenderList] = useState(0);

  const createRecipe = (e) => {
    console.log(e);
  };

  useEffect(() => {
    try {
      const getItems = async () => {
        const querySnapshot = await getDocs(recipesCollection);
        setRecipesList(
          querySnapshot.docs.map((document) => ({ ...document.data(), document_id: document.id }))
        );
      };
      getItems();
      console.log('infinite loop?');
    } catch (err) {
      console.log('getItems from db error -> ' + err);
    }
  }, [renderList]);

  return (
    <div id="container-recipes-page">
      <ThemeProvider theme={theme}>
        <h1 className="title">My recipes</h1>
        <div>
          <Button
            sx={{ width: '11rem' }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => createRecipe(navigation('/recipes/create-a-new-recipe'))}
            type="submit">
            Create new recipe
          </Button>
        </div>
        <div id="recipes-list">
          <Stack spacing={2}>
            {recipesList.map((recipe, index) => {
              return (
                <div key={index}>
                  <MultiActionAreaCard recipe={recipe} />
                </div>
              );
            })}
          </Stack>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Recipes;
