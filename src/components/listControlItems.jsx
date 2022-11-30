import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import { Tooltip } from '@mui/material';
// import Stack from '@mui/material/Stack';
// { item, check, deleted }
export default function ListControlItems({ item }) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    console.log('itempressed');
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDelete = (e) => {
    console.log(e);
  };

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {/* {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return ( */}
        <ListItem
          // key={value}
          secondaryAction={
            <IconButton onClick={(e) => handleDelete(e)}>
              <DeleteIcon />
            </IconButton>
          }
          disablePadding>
          <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                // checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                // inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={'labelId'} primary={`${item}`} />
          </ListItemButton>
        </ListItem>
        {/* //     ); */}
        {/* //   })} */}
      </List>
      {/* <Tooltip title="Delete">
        <IconButton onClick={console.log('hi')} edge="end" aria-label="comments">
          <DeleteIcon />
        </IconButton>
      </Tooltip> */}
    </div>
  );
}
