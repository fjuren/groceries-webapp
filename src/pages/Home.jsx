import React, { useState, useEffect } from 'react';
import '../assets/styles/home.css';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import PublicActionAreaCard from '../components/PublicActionAreaCard';
import UnAuthActionAreaCard from '../components/UnAuthActionAreaCard';

const Home = ({ authStatus }) => {
  const navigation = useNavigate();

  const recipesCollection = collection(db, 'recipes');

  const [loadSpinner, setLoadSpinner] = useState(false);
  const [homeList, setHomeList] = useState([]);
  const [renderList, setRenderList] = useState(0);

  const viewRecipeDetails = (recipe_data) => {
    try {
      navigation('/view-recipe', { state: { data: recipe_data } });
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
        setHomeList(
          querySnapshot.docs.map((document) => ({ ...document.data(), document_id: document.id }))
        );
        setLoadSpinner(false);
      };
      getItems();
    } catch (err) {
      setLoadSpinner(true);
      console.log('getHome from DB error => ' + err);
    }
  }, [renderList]);

  return (
    <div id="container-home-page">
      <ThemeProvider theme={theme}>
        <h1 className="title">Community recipes</h1>
        <div id="home-list">
          {loadSpinner ? (
            <div className="loader-container">
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <Stack spacing={2}>
              {homeList.map((recipe, index) => {
                return (
                  <div key={index}>
                    {authStatus ? (
                      <PublicActionAreaCard recipe={recipe} viewRecipeDetails={viewRecipeDetails} />
                    ) : (
                      <UnAuthActionAreaCard recipe={recipe} viewRecipeDetails={viewRecipeDetails} />
                    )}
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

export default Home;
