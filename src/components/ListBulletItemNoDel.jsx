import React from 'react';
import theme from '../theme';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider } from '@mui/system';

// import Stack from '@mui/material/Stack';

export default function ListBulletItemsNoDel({ bulletItemFromList }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem disablePadding>
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <CircleIcon edge="start" sx={{ fontSize: 10 }} />
              </ListItemIcon>
              {/* <li><ListItemText id={'labelId'} primary={`${itemFromList.item}`} /></li> */}
              <ListItemText primary={`${bulletItemFromList}`} />
            </ListItemButton>
          </ListItem>
        </List>
      </ThemeProvider>
    </div>
  );
}
