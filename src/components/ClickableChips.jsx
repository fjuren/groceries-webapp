import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { ThemeProvider } from '@emotion/react';
import theme from '../../src/theme';

export default function ClickableChips({ label, handleChipClick }) {
  const [itemChipStatus, setItemChipStatus] = useState(false);

  // const handleClick = (chipName) => {
  //   setItemChipStatus(!itemChipStatus);
  //   handleChipClick(itemChipStatus, chipName);
  // };
  const handleClick = () => {
    setItemChipStatus(!itemChipStatus);
  };

  useEffect(() => {
    handleChipClick(itemChipStatus, label);
  }, [itemChipStatus]);

  return (
    <div id={`${label}-chip`}>
      <ThemeProvider theme={theme}>
        <Chip
          label={label} // ID
          variant="outlined"
          // onClick={() => handleClick(label)}
          onClick={() => handleClick()}
          sx={{
            bgcolor: itemChipStatus ? 'selected.main' : 'inherit',
            borderColor: itemChipStatus ? 'primary.main' : 'lightgray'
          }}
        />
      </ThemeProvider>
    </div>
  );
}
