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
  previewMode: {
    flex: 1,
    margin: '1rem',
  },
}));

const calcAge = dob => {
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms);

  return <span style={{fontSize: 14}}>{Math.abs(age_dt.getUTCFullYear() - 1970)}</span>;
};

export default function({ kid, deleteKid, updateKid, preview }) {
  const classes = useStyles();
  return (
    <Card className={classes.card + ' ' + (preview ? classes.previewMode : '')}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            kid.image ||
            'https://cdn-images-1.medium.com/max/1800/1*l9eqA179Bw1QoMA8iwBvHw.png'
          }
          title='kid'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {kid.nickName || 'Nickname'} {kid.dob && calcAge(new Date(kid.dob))}
          </Typography>
          <Typography variant='body2' color='textPrimary' component='p'>
            {kid.fullName || 'Fullname'}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {kid.bio || 'Description about the kid'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary' onClick={() => updateKid(kid.id)}>
          Learn More
        </Button>
        {!preview && (
          <Button
            size='small'
            color='default'
            onClick={() => deleteKid(kid.id)}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
