import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

// import Stack from '@mui/material/Stack';

export default function ListBulletItems({ bulletItemFromList, handleDeleteItem }) {
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem
          secondaryAction={
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDeleteItem(bulletItemFromList)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          disablePadding>
          <ListItemButton role={undefined} dense>
            <ListItemIcon>
              <CircleIcon edge="start" sx={{ fontSize: 10 }} />
            </ListItemIcon>

            {/* <li><ListItemText id={'labelId'} primary={`${itemFromList.item}`} /></li> */}
            <ListItemText primary={`${bulletItemFromList}`} />
            {/* <ListItemIcon>              
            </ListItemIcon> */}
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
