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

export default function ListControlItems({ itemFromList, deleteItem, handleCheck }) {
  const [checkStatus, setCheckStatus] = useState(itemFromList.checkmark);

  const handleChangeStateClick = (item_id) => {
    // changes state of checkmark on grocerfylist
    console.log('---------------------');
    console.log('checkmark from BEFORE handleCheck child itemList: ' + itemFromList.checkmark);
    handleCheck(!checkStatus, item_id);
  };
  //   const handleChangeStateClick = (item_id) => {
  //     // changes state of checkmark on grocerfylist
  //     handleCheck(!checkmark, item_id);
  //     console.log('checkmark state: ' + checkmark);
  //     console.log('checkmark from itemList: ' + item.checkmark);
  //   };

  useEffect(() => {
    const getItems = async () => {
      const docRef = doc(db, 'groceries', itemFromList.item_id);
      const docSnap = await getDoc(docRef);
      const data = await docSnap.data();

      setCheckStatus(data.checkmark);
    };
    getItems();
  });

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {/* {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return ( */}
        <ListItem
          // key={value}
          secondaryAction={
            // <IconButton onClick={(e) => handleDelete(e)}>
            <Tooltip title="Delete">
              <IconButton onClick={() => deleteItem(itemFromList.item_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          disablePadding>
          {/* <ListItemButton role={undefined} onClick={handleToggle(value)} dense> */}
          {/* <ListItemButton role={undefined} onClick={() => handleCheck(item.item_id)} dense> */}
          <ListItemButton
            role={undefined}
            onClick={() => handleChangeStateClick(itemFromList.item_id)}
            dense>
            {/* <ListItemButton role={undefined} dense> */}
            <ListItemIcon>
              <Checkbox
                edge="start"
                // bug: clicking checkbox calls both ListItemButton onclick and checkbox onChange events. FIXED?
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
