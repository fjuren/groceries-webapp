import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PersonalActionAreaCard from '../components/PersonalActionAreaCard';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import '../assets/styles/recipes.css';

import { auth, db } from '../firebase.config';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';

const Recipes = (authStatus) => {
  const navigation = useNavigate();
  const recipesCollection = collection(db, 'recipes');

  const [loadSpinner, setLoadSpinner] = useState(false);
  const [recipesList, setRecipesList] = useState([]);
  const [renderList, setRenderList] = useState(0);

  const createRecipe = () => {
    navigation('/recipes/create-a-new-recipe');
  };

  // FIXME might be more efficient to move viewRecipeDetails and handleDeleteRecipe functions to the relevant component cards instead of the recipe.jsx file. See handleLike function in PublicActionAreaCard for example
  const viewRecipeDetails = (recipe_data) => {
    try {
      // navigation(`recipes/${recipe_data}`, { state: { recipe_data } });
      navigation('/recipes/view-recipe', { state: { data: recipe_data } });
      // <Link
      //   to={{
      //     pathname: `recipes/${recipe_data}`,
      //     state: recipe_data // your data array of objects
      //   }}></Link>;
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
      setLoadSpinner(true);
      const getItems = async () => {
        const querySnapshot = await getDocs(recipesCollection);
        setRecipesList(
          querySnapshot.docs.map((document) => ({ ...document.data(), document_id: document.id }))
        );
        setLoadSpinner(false);
      };
      getItems();
    } catch (err) {
      setLoadSpinner(true);
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
          {loadSpinner ? (
            <div className="loader-container">
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <Stack spacing={2}>
              {recipesList.map((recipe, index) => {
                return (
                  <div key={index}>
                    {authStatus && recipe.author.id === auth.currentUser.uid ? (
                      <PersonalActionAreaCard
                        recipe={recipe}
                        viewRecipeDetails={viewRecipeDetails}
                        handleDeleteRecipe={handleDeleteRecipe}
                      />
                    ) : null}
                  </div>
                );
              })}
            </Stack>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Recipes;
