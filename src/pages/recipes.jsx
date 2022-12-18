import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MultiActionAreaCard from '../components/Multiactionareacard';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/recipes.css';

import { auth, db } from '../firebase.config';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';

const Recipes = () => {
  const navigation = useNavigate();
  const recipesCollection = collection(db, 'recipes');

  const [recipesList, setRecipesList] = useState([]);
  const [renderList, setRenderList] = useState(0);

  const createRecipe = () => {
    navigation('/recipes/create-a-new-recipe');
  };

  const viewRecipeDetails = (recipe_title) => {
    try {
      navigation(`recipes/${recipe_title}`);
    } catch (err) {
      console.log('viewRecipeDetails error -> ' + err);
    }
  };

  const handleDeleteRecipe = async (recipe_doc_id) => {
    try {
      await deleteDoc(doc(db, 'recipes', recipe_doc_id));
      setRenderList(renderList + 1);
    } catch (err) {
      console.log('handleDeleteRecipe error -> ' + err);
    }
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
            onClick={() => createRecipe()}
            type="submit">
            Create new recipe
          </Button>
        </div>
        <div id="recipes-list">
          <Stack spacing={2}>
            {recipesList.map((recipe, index) => {
              return (
                <div key={index}>
                  <MultiActionAreaCard
                    recipe={recipe}
                    viewRecipeDetails={viewRecipeDetails}
                    handleDeleteRecipe={handleDeleteRecipe}
                  />
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
