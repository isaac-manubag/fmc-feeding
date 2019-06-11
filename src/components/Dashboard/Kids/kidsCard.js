import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {},
  media: {
    height: 140,
  },
}));

export default function({ kid, deleteKid }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={kid.image} title="kid" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {kid.nickName}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {kid.fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {kid.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Button size="small" color="default" onClick={() => deleteKid(kid.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
