import React, { useEffect, useState } from 'react';
import '../assets/styles/publicactionareacard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ListItemButton, CardActionArea, CardActions, IconButton, Tooltip } from '@mui/material';

import { auth, db } from '../firebase.config';
import { doc, updateDoc, increment, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export default function UnAuthActionAreaCard({ recipe, viewRecipeDetails }) {
  // const [votes, setVotes] = useState(1);
  // const [userLikedRecipe, setUserLikedRecipe] = useState([]);
  // const [userDislikedRecipe, setUserDislikedRecipe] = useState([]);
  // const [favourites, setFavourites] = useState(1);
  // const [userFavouritedRecipe, setUserFavouritedRecipe] = useState([]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      console.log('like');
    } catch (err) {
      console.log('handleLike error -> ' + err);
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    try {
      console.log('dislike');
    } catch (err) {
      console.log('handleVotes error -> ' + err);
    }
  };

  const handleFavouritedRecipe = async (e) => {
    e.preventDefault();
    try {
      console.log('favourite');
    } catch (err) {
      console.log('handleFavouritedRecipe error -> ' + err);
    }
  };

  // useEffect(() => {
  //   const getVotes = async () => {
  //     const docRef = doc(db, 'recipes', recipe.document_id);
  //     const docSnap = await getDoc(docRef);
  //     setVotes(docSnap.data().votes);
  //   };
  //   getVotes();

  //   const userLikes = async () => {
  //     const userSnap = await getDoc(user);
  //     setUserLikedRecipe(userSnap.data().liked_recipes);
  //   };
  //   userLikes();

  //   const userDislikes = async () => {
  //     const userSnap = await getDoc(user);
  //     setUserDislikedRecipe(userSnap.data().disliked_recipes);
  //   };
  //   userDislikes();

  //   const userFavourites = async () => {
  //     const userSnap = await getDoc(user);
  //     setUserFavouritedRecipe(userSnap.data().favourited_recipes);
  //   };
  //   userFavourites();
  // }, [votes, favourites]);

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
            <ListItemButton disableRipple>
              <div>
                <Tooltip title="Dislike">
                  <IconButton
                    aria-label="dislike"
                    onClick={(e) => handleDislike(e, recipe.document_id)}>
                    <ThumbDownOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </ListItemButton>
          </div>
          <div className="btn-icons">
            <ListItemButton disableRipple>
              <div>
                <Tooltip title="Like">
                  <IconButton aria-label="like" onClick={(e) => handleLike(e, recipe.document_id)}>
                    <ThumbUpAltOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </ListItemButton>
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
          {/* <div className="btn-icons">
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
          </div> */}
          <div className="btn-icons">
            <ListItemButton disableRipple>
              <div>
                <IconButton
                  aria-label="favourite"
                  onClick={(e) => handleFavouritedRecipe(e, recipe.document_id)}>
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
