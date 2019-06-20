import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  card: {},
  media: {
    height: 140
  },
}));

export default function({ staff }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            staff.photoURL ||
            "https://cdn-images-1.medium.com/max/1800/1*l9eqA179Bw1QoMA8iwBvHw.png"
          }
          title="kid"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {staff.displayName}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {staff.email}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {staff.provider}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
