import React, { useState, useEffect } from 'react';
import '../assets/styles/favourites.css';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { auth, db } from '../firebase.config';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import PublicActionAreaCard from '../components/PublicActionAreaCard';

const Favourites = ({ authStatus }) => {
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

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const getItems = async () => {
            const uid = user.uid;
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            const userFavourites = docSnap.data().favourited_recipes;
            const userQuery = query(recipesCollection, where('title', 'in', userFavourites));
            const querySnapshot = await getDocs(userQuery);
            setFavouritesList(
              querySnapshot.docs.map((document) => ({
                ...document.data(),
                document_id: document.id
              }))
            );
            setLoadSpinner(false);
          };
          getItems();
        }
      });
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
          ) : favouritesList.length === 0 ? (
            <div>
              <p>
                You haven&apos;t favourited any recipes yet! Start finding recipes you want to save
                for later.
              </p>
            </div>
          ) : authStatus ? (
            <Stack spacing={2}>
              {favouritesList.map((recipe, index) => {
                return (
                  <div key={index}>
                    <PublicActionAreaCard recipe={recipe} viewRecipeDetails={viewRecipeDetails} />
                  </div>
                );
              })}
            </Stack>
          ) : null}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Favourites;
