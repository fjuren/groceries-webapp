import React from 'react';
import '../assets/styles/publicactionareacard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BasicModal from './BasicModal';
import truncate from '../utilities/truncate';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ListItemButton, CardActionArea, CardActions, IconButton, Tooltip } from '@mui/material';

export default function UnAuthActionAreaCard({ recipe, viewRecipeDetails }) {
  const [openModal, setOpenModal] = React.useState(false);

  const handleModalStatus = () => {
    setOpenModal(false);
  };

  const handleIconClick = async (e) => {
    e.preventDefault();
    try {
      console.log('dislike');
      setOpenModal(true);
      // <BasicModal openStatus={true} />;
    } catch (err) {
      console.log('handleVotes error -> ' + err);
    }
  };

  return (
    <Card id="MUIcard" sx={{ maxWidth: 1000 }}>
      {openModal ? <BasicModal openStatus={true} handleModalStatus={handleModalStatus} /> : null}
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
          <div className="btn-icons">
            <ListItemButton disableRipple>
              <div>
                <Tooltip title="Dislike">
                  <IconButton aria-label="dislike" onClick={(e) => handleIconClick(e)}>
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
                  <IconButton aria-label="like" onClick={(e) => handleIconClick(e)}>
                    <ThumbUpAltOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </ListItemButton>
          </div>
          <div className="btn-icons">
            <ListItemButton disableRipple>
              <div>
                <IconButton aria-label="comment" onClick={(e) => handleIconClick(e)}>
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
                <IconButton aria-label="favourite" onClick={(e) => handleIconClick(e)}>
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
