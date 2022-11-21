import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';

const Grocerfylist = () => {
  return (
    <div id="container-grocerfy-page">
      <ThemeProvider theme={theme}></ThemeProvider>
      <h1>My Grocerfy List</h1>
    </div>
  );
};

export default Grocerfylist;
