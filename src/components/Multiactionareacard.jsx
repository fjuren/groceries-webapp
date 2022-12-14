import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';

export default function MultiActionAreaCard({ recipe }) {
  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardActionArea disableRipple>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <div
          id="btn-icon-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '700px',
            justifyContent: 'space-between'
          }}>
          <div>
            <IconButton aria-label="dislike">
              <ThumbDownOutlinedIcon />
            </IconButton>
          </div>
          <div>
            <IconButton aria-label="like">
              <ThumbUpAltOutlinedIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <IconButton aria-label="comment">
                <ChatBubbleOutlineOutlinedIcon />
              </IconButton>
            </div>
            <div>
              <p>Comments</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <IconButton aria-label="share">
                <IosShareOutlinedIcon />
              </IconButton>
            </div>
            <div>
              <p>Share</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="favourite">
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            </div>
            <div>
              <p>Favourites</p>
            </div>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
