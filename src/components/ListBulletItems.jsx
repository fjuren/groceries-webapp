import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase.config';
// import Stack from '@mui/material/Stack';

export default function ListBulletItems({ bulletItemFromList, handleDeleteItem }) {
  // useEffect(() => {
  //   const getItems = async () => {
  //     const docRef = doc(db, 'groceries', itemFromList.item_id);
  //     const docSnap = await getDoc(docRef);
  //     const data = await docSnap.data();
  //   };
  //   getItems();
  // });

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
            <ul>
              <li>{/* <ListItemText id={'labelId'} primary={`${itemFromList.item}`} /> */}</li>
              <li>
                <ListItemText primary={`${bulletItemFromList}`} />{' '}
              </li>
            </ul>
            {/* <ListItemIcon>              
            </ListItemIcon> */}
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
