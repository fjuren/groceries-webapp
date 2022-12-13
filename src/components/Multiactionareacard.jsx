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
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({ recipe }) {
  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardActionArea>
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
      <CardActions>
        <Button size="small" color="primary">
          <ThumbDownOutlinedIcon />
        </Button>
        <Button size="small" color="primary">
          <ThumbUpAltOutlinedIcon />
        </Button>
        <Button size="small" color="primary">
          <ChatBubbleOutlineOutlinedIcon />
          Comments
        </Button>
        <Button size="small" color="primary">
          <IosShareOutlinedIcon />
          Share
        </Button>
        <Button size="small" color="primary">
          <FavoriteBorderOutlinedIcon />
          Favourites
        </Button>
      </CardActions>
    </Card>
  );
}
