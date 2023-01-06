import React, { useEffect, useState } from 'react';
import '../assets/styles/publicactionareacard.css'; // FIXME
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
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

import { db } from '../firebase.config';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';

// Component card for recipe page (favourite button removed)
export default function PersonalActionAreaCard({ recipe, viewRecipeDetails, handleDeleteRecipe }) {
  const [votes, setVotes] = useState(0);

  const handleLike = async (e, recipe_id) => {
    e.preventDefault();
    try {
      const recipeTotalVotesField = doc(db, 'recipes', recipe_id);
      await updateDoc(recipeTotalVotesField, { votes: increment(1) });
      setVotes(votes + 1);
    } catch (err) {
      console.log('handleVote error -> ' + err);
    }
  };

  const handleDislike = async (e, recipe_id) => {
    e.preventDefault();
    try {
      const recipeTotalVotesField = doc(db, 'recipes', recipe_id);
      await updateDoc(recipeTotalVotesField, { votes: increment(-1) });
      setVotes(votes - 1);
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
          <div className="btn-icons">
            <Tooltip title="Dislike">
              <IconButton
                aria-label="dislike"
                onClick={(e) => handleDislike(e, recipe.document_id)}>
                <ThumbDownOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
          <span id="votes">{votes}</span>
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
        </div>
      </CardActions>
    </Card>
  );
}
