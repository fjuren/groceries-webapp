import React, { useEffect, useState } from 'react';
import '../assets/styles/personalactionareacard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  ListItemButton,
  CardActionArea,
  CardActions,
  IconButton,
  Tooltip,
  CardHeader
} from '@mui/material';

import { auth, db } from '../firebase.config';
import { doc, updateDoc, increment, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// Component card for recipe page (favourite button removed)
export default function PersonalActionAreaCard({ recipe, viewRecipeDetails, handleDeleteRecipe }) {
  const [votes, setVotes] = useState(1);
  const [userLikedRecipe, setUserLikedRecipe] = useState([]);
  const [userDislikedRecipe, setUserDislikedRecipe] = useState([]);

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
  }, [votes]);

  return (
    <Card id="MUIcard" sx={{ maxWidth: 1000 }}>
      <CardHeader
        id="MUIcardheader"
        sx={{ maxHeight: 500 }}
        action={
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteRecipe(recipe.document_id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }></CardHeader>
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
        </div>
      </CardActions>
    </Card>
  );
}
