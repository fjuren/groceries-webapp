import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import PublicActionAreaCard from '../components/PublicActionAreaCard';

const Favourites = () => {
  const navigation = useNavigate();

  const recipesCollection = collection(db, 'recipes');

  const [loadSpinner, setLoadSpinner] = useState(false);
  const [favouritesList, setFavouritesList] = useState([]);
  const [renderList, setRenderList] = useState(0);

  const viewRecipeDetails = (recipe_data) => {
    try {
      navigation('/favourites/view-recipe', { state: { data: recipe_data } });
    } catch (err) {
      console.log('viewRecipeDetails error => ' + err);
    }
  };

  useEffect(() => {
    try {
      setLoadSpinner(true);
      const getItems = async () => {
        // Update this once the build of HomePage is done. Currently no way to favourite recipes
        const querySnapshot = await getDocs(recipesCollection);
        setFavouritesList(
          querySnapshot.docs.map((document) => ({ ...document.data(), document_id: document.id }))
        );
        setLoadSpinner(false);
      };
      getItems();
    } catch (err) {
      setLoadSpinner(true);
      console.log('getFavourites from DB error => ' + err);
    }
  }, [renderList]);

  return (
    <div id="container-favourites-page">
      <ThemeProvider theme={theme}>
        <h1 className="title">My favourites</h1>
        <div id="favourites-list">
          {loadSpinner ? (
            <div className="loader-container">
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <Stack spaceing={2}>
              {favouritesList.map((recipe, index) => {
                return (
                  <div key={index}>
                    <PublicActionAreaCard recipe={recipe} viewRecipeDetails={viewRecipeDetails} />
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

export default Favourites;
