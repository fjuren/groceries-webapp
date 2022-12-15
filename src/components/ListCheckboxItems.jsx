import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
// import Stack from '@mui/material/Stack';

export default function ListCheckboxItems({ itemFromList, handleDeleteItem, handleCheckItem }) {
  const [checkStatus, setCheckStatus] = useState(itemFromList.checkmark);

  const handleChangeStateClick = (item_id) => {
    // changes state of checkmark on grocerfylist
    handleCheckItem(!checkStatus, item_id);
  };

  console.log(itemFromList.item_id);
  useEffect(() => {
    const getItems = async () => {
      const docRef = doc(db, 'groceries', itemFromList.item_id);
      const docSnap = await getDoc(docRef);
      const data = await docSnap.data();
      setCheckStatus(data.checkmark);
    };
    getItems();
    // BUG: this useEffect is also called when the delete button is pressed. When the item gets deleted, the item is null and you'll get a console error
    // BUG: related to the first bug, but item deletes randomly sometimes after pressing the checkbox
  });
  //   [itemFromList]

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem
          secondaryAction={
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDeleteItem(itemFromList.item_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          disablePadding>
          <ListItemButton
            // role={undefined}
            onClick={() => handleChangeStateClick(itemFromList.item_id)}
            dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                // BUG: clicking checkbox calls both ListItemButton onclick and checkbox onChange events. FIXED?
                checked={checkStatus}
                onClick={() => handleChangeStateClick(itemFromList.item_id)}
                tabIndex={-1}
                disableRipple
                // inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={'labelId'} primary={`${itemFromList.item}`} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
