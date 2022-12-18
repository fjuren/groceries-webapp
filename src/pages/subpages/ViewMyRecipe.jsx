import React from 'react';
import BreadCrumb from '../../components/breadcrumb';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme';
import { useLocation } from 'react-router-dom';

import ListBulletItemsNoDel from '../../components/ListBulletItemNoDel';

const ViewMyRecipe = () => {
  const { state } = useLocation();

  const parentPage = '/recipes';
  const parentPageName = 'Recipes';
  const currentPageName = `${state.data.title}`;

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
              <p>{state.data.description}</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ViewMyRecipe;
