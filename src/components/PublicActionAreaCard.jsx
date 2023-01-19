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
import truncate from '../utilities/truncate';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ListItemButton, CardActionArea, CardActions, IconButton, Tooltip } from '@mui/material';

import { auth, db } from '../firebase.config';
import { doc, updateDoc, increment, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export default function PublicActionAreaCard({ recipe, viewRecipeDetails }) {
  const [votes, setVotes] = useState(1);
  const [userLikedRecipe, setUserLikedRecipe] = useState([]);
  const [userDislikedRecipe, setUserDislikedRecipe] = useState([]);
  const [favourites, setFavourites] = useState(1);
  const [userFavouritedRecipe, setUserFavouritedRecipe] = useState([]);

  const user = doc(db, 'users', auth.currentUser.uid);

  const handleLike = async (e, recipe_id) => {
    e.preventDefault();
    const recipe = doc(db, 'recipes', recipe_id);
    const recipeSnap = await getDoc(recipe);
    const userSnap = await getDoc(user);
    try {
      if (
        !userSnap.data().liked_recipes.includes(recipeSnap.data().title) &&
        userSnap.data().disliked_recipes.includes(recipeSnap.data().title)
      ) {
        await updateDoc(recipe, { votes: increment(2) });
        await updateDoc(user, {
          disliked_recipes: arrayRemove(recipeSnap.data().title)
        });
        await updateDoc(user, {
          liked_recipes: arrayUnion(recipeSnap.data().title)
        });
        setVotes(votes + 1);
      } else if (
        !userSnap.data().liked_recipes.includes(recipeSnap.data().title) &&
        !userSnap.data().disliked_recipes.includes(recipeSnap.data().title)
      ) {
        await updateDoc(recipe, { votes: increment(1) });
        await updateDoc(user, {
          liked_recipes: arrayUnion(recipeSnap.data().title)
        });
        setVotes(votes + 1);
      } else {
        await updateDoc(recipe, { votes: increment(-1) });
        await updateDoc(user, {
          liked_recipes: arrayRemove(recipeSnap.data().title)
        });
        setVotes(votes - 1);
      }
    } catch (err) {
      console.log('handleLike error -> ' + err);
    }
  };

  const handleDislike = async (e, recipe_id) => {
    e.preventDefault();
    const recipe = doc(db, 'recipes', recipe_id);
    const recipeSnap = await getDoc(recipe);
    const userSnap = await getDoc(user);
    try {
      if (
        !userSnap.data().disliked_recipes.includes(recipeSnap.data().title) &&
        userSnap.data().liked_recipes.includes(recipeSnap.data().title)
      ) {
        await updateDoc(recipe, { votes: increment(-2) });
        await updateDoc(user, {
          liked_recipes: arrayRemove(recipeSnap.data().title)
        });
        await updateDoc(user, {
          disliked_recipes: arrayUnion(recipeSnap.data().title)
        });
        setVotes(votes - 1);
      } else if (
        !userSnap.data().liked_recipes.includes(recipeSnap.data().title) &&
        !userSnap.data().disliked_recipes.includes(recipeSnap.data().title)
      ) {
        await updateDoc(recipe, { votes: increment(-1) });
        await updateDoc(user, {
          disliked_recipes: arrayUnion(recipeSnap.data().title)
        });
        setVotes(votes - 1);
      }
      // setLikePressed(true);
      else {
        await updateDoc(recipe, { votes: increment(1) });
        await updateDoc(user, {
          disliked_recipes: arrayRemove(recipeSnap.data().title)
        });
        setVotes(votes + 1);
      }
    } catch (err) {
      console.log('handleVotes error -> ' + err);
    }
  };

  const handleFavouritedRecipe = async (e, recipe_id) => {
    e.preventDefault();
    const recipe = doc(db, 'recipes', recipe_id);
    const recipeSnap = await getDoc(recipe);
    const userSnap = await getDoc(user);
    try {
      if (!userSnap.data().favourited_recipes.includes(recipeSnap.data().title)) {
        await updateDoc(recipe, { total_favourites: increment(1) });
        await updateDoc(user, {
          favourited_recipes: arrayUnion(recipeSnap.data().title)
        });
        setFavourites(favourites + 1);
      } else {
        await updateDoc(recipe, { total_favourites: increment(-1) });
        await updateDoc(user, {
          favourited_recipes: arrayRemove(recipeSnap.data().title)
        });
        setFavourites(favourites - 1);
      }
    } catch (err) {
      console.log('handleFavouritedRecipe error -> ' + err);
    }
  };

  useEffect(() => {
    const getVotes = async () => {
      const docRef = doc(db, 'recipes', recipe.document_id);
      const docSnap = await getDoc(docRef);
      setVotes(docSnap.data().votes);
    };
    getVotes();

    const userLikes = async () => {
      const userSnap = await getDoc(user);
      setUserLikedRecipe(userSnap.data().liked_recipes);
    };
    userLikes();

    const userDislikes = async () => {
      const userSnap = await getDoc(user);
      setUserDislikedRecipe(userSnap.data().disliked_recipes);
    };
    userDislikes();

    const userFavourites = async () => {
      const userSnap = await getDoc(user);
      setUserFavouritedRecipe(userSnap.data().favourited_recipes);
    };
    userFavourites();
  }, [votes, favourites]);

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
            {truncate(recipe.description, 500)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <div id="btn-icon-container">
          {userDislikedRecipe.includes(recipe.title) ? (
            <div className="btn-icons">
              <ListItemButton disableRipple>
                <div>
                  <Tooltip title="Dislike">
                    <IconButton
                      variant="filled"
                      sx={{ color: 'green' }}
                      aria-label="like"
                      onClick={(e) => handleDislike(e, recipe.document_id)}>
                      <ThumbDownIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </ListItemButton>
            </div>
          ) : (
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
          )}
          <span id="votes">{votes}</span>
          {userLikedRecipe.includes(recipe.title) ? (
            <div className="btn-icons">
              <ListItemButton disableRipple>
                <div>
                  <Tooltip title="Like">
                    <IconButton
                      variant="filled"
                      sx={{ color: 'green' }}
                      aria-label="like"
                      onClick={(e) => handleLike(e, recipe.document_id)}>
                      <ThumbUpIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </ListItemButton>
            </div>
          ) : (
            <div className="btn-icons">
              <ListItemButton disableRipple>
                <div>
                  <Tooltip title="Like">
                    <IconButton
                      aria-label="like"
                      onClick={(e) => handleLike(e, recipe.document_id)}>
                      <ThumbUpAltOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </ListItemButton>
            </div>
          )}
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
          {userFavouritedRecipe.includes(recipe.title) ? (
            <div className="btn-icons">
              <ListItemButton disableRipple>
                <div>
                  <IconButton
                    aria-label="favourite"
                    variant="filled"
                    sx={{ color: 'green' }}
                    onClick={(e) => handleFavouritedRecipe(e, recipe.document_id)}>
                    <FavoriteIcon />
                  </IconButton>
                </div>
                <div>
                  <p>Favourite</p>
                </div>
              </ListItemButton>
            </div>
          ) : (
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
          )}
        </div>
      </CardActions>
    </Card>
  );
}
