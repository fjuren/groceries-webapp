import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
  const navigation = useNavigate();
  const createRecipe = (e) => {
    console.log(e);
  };

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
          <h1>Recipe cards will go here</h1>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Recipes;
