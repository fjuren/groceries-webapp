import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
          Upvote
        </Button>
        <Button size="small" color="primary">
          Downvote
        </Button>
        <Button size="small" color="primary">
          Comments
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Favourites
        </Button>
      </CardActions>
    </Card>
  );
}
