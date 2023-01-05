import React, { useEffect, useState } from 'react';
import '../assets/styles/publicactionareacard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ListItemButton, CardActionArea, CardActions, IconButton, Tooltip } from '@mui/material';

import { db } from '../firebase.config';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';

export default function PublicActionAreaCard({ recipe, viewRecipeDetails }) {
  const [likes, setLikes] = useState(0);

  const handleLike = async (e, recipe_id) => {
    e.preventDefault();
    try {
      const recipeTotalLikesField = doc(db, 'recipes', recipe_id);
      await updateDoc(recipeTotalLikesField, { total_likes: increment(1) });
      setLikes(likes + 1);
    } catch (err) {
      console.log('handleLike error -> ' + err);
    }
  };

  const handleDislike = async (e, recipe_id) => {
    e.preventDefault();
    try {
      const recipeTotalLikesField = doc(db, 'recipes', recipe_id);
      await updateDoc(recipeTotalLikesField, { total_likes: increment(-1) });
      setLikes(likes - 1);
    } catch (err) {
      console.log('handleLike error -> ' + err);
    }
  };

  // useEffect(() => {
  //   const getLikes = async () => {
  //     const docRef = doc(db, 'recipes', recipe.document_id);
  //     const docSnap = await getDoc(docRef);
  //     document.getElementById('votes').innerHTML = docSnap.data().total_likes;
  //     // console.log(docSnap.data().total_likes);
  //   };
  //   getLikes();
  // }, [likes]);

  return (
    <Card id="MUIcard" sx={{ maxWidth: 1000 }}>
      <CardActionArea onClick={() => viewRecipeDetails(recipe)} disableRipple>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: '0' }}>
            {recipe.title}
          </Typography>
          <Typography variant="p" component="div" sx={{ color: 'grey', pb: '10px' }}>
            <i>
              Posted by {recipe.author.name} on {recipe.recipe_created.toDate().toDateString()}
            </i>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <div id="btn-icon-container">
          <div className="btn-icons">
            <Tooltip title="Dislike">
              <IconButton
                aria-label="dislike"
                onClick={(e) => handleDislike(e, recipe.document_id)}>
                <ThumbDownOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
          <span id="votes">{recipe.total_likes}</span>
          <div className="btn-icons">
            <Tooltip title="Like">
              <IconButton aria-label="like" onClick={(e) => handleLike(e, recipe.document_id)}>
                <ThumbUpAltOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="btn-icons">
            <ListItemButton disableRipple>
              <div>
                <IconButton aria-label="comment">
                  <ChatBubbleOutlineOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <p>Comments</p>
              </div>
            </ListItemButton>
          </div>
          <div className="btn-icons">
            <ListItemButton disableRipple>
              <div>
                <IconButton aria-label="share">
                  <IosShareOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <p>Share</p>
              </div>
            </ListItemButton>
          </div>
          <div className="btn-icons">
            <ListItemButton disableRipple>
              <div>
                <IconButton aria-label="favourite">
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </div>
              <div>
                <p>Favourite</p>
              </div>
            </ListItemButton>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
