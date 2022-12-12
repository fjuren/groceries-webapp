import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { ThemeProvider } from '@emotion/react';
import theme from '../../src/theme';

export default function ClickableChips({ label, handleChipClick }) {
  const [itemtypeStatus, setItemtypeStatus] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setItemtypeStatus(!itemtypeStatus);
  };

  useEffect(() => {
    // console.log('i fire once from chips');
    handleChipClick(label, itemtypeStatus);
  }, [itemtypeStatus]);

  return (
    <div id={`${label}-chip`}>
      <ThemeProvider theme={theme}>
        <Chip
          label={label} // ID
          variant="outlined"
          onClick={(e) => handleClick(e)}
          sx={{
            bgcolor: itemtypeStatus ? 'selected.main' : 'inherit',
            borderColor: itemtypeStatus ? 'primary.main' : 'lightgray'
          }}
        />
      </ThemeProvider>
    </div>
  );
}
