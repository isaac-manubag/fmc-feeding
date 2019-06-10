import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    card: {
    },
    media: {
        height: 140,
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 40,
        bottom: 20,
        position: 'fixed',
      }
}));

const kids = [
    {
        fullName: 'Enmanuel Miranda Espino',
        nickName: 'Pino',
        age: 12,
        bio: 'Reader. Award-winning coffee geek. Social media junkie. Creator. Unapologetic twitter expert.'
    },
    {
        fullName: 'Emma Alaniz',
        nickName: 'Emmyat',
        age: 10,
        bio: 'Avid problem solver. Alcohol maven. Proud twitter fanatic. Passionate tv expert. Introvert.'
    },
    {
        fullName: 'Sophie Castro Becerra',
        nickName: 'Sophie',
        age: 11,
        bio: 'Wannabe bacon aficionado. Zombie evangelist. Creator. Freelance analyst.'
    },
    {
        fullName: 'Lemuel Solorio Saldivar',
        nickName: 'Lemuel',
        age: 15,
        bio: 'Certified student. Infuriatingly humble troublemaker. Amateur analyst. Food scholar. Lifelong introvert. Explorer. Hipster-friendly entrepreneur. Zombieaholic.'
    },
    {
        fullName: 'Paloma Villaseñor Orellana',
        nickName: 'Paloma',
        age: 13,
        bio: 'Travel fanatic. Internet enthusiast. Extreme pop culture advocate. Unapologetic writer. Introvert.'
    },
    {
        fullName: 'Douglas S. Evans',
        nickName: 'Douglas',
        age: 9,
        bio: 'Social media evangelist. Freelance pop culture advocate. Alcohol trailblazer.'
    },
    {
        fullName: 'Sophie Castro Becerra',
        nickName: 'Sophie',
        age: 11,
        bio: 'Wannabe bacon aficionado. Zombie evangelist. Creator. Freelance analyst.'
    },
    {
        fullName: 'Lemuel Solorio Saldivar',
        nickName: 'Lemuel',
        age: 15,
        bio: 'Certified student. Infuriatingly humble troublemaker. Amateur analyst. Food scholar. Lifelong introvert. Explorer. Hipster-friendly entrepreneur. Zombieaholic.'
    },
    {
        fullName: 'Paloma Villaseñor Orellana',
        nickName: 'Paloma',
        age: 13,
        bio: 'Travel fanatic. Internet enthusiast. Extreme pop culture advocate. Unapologetic writer. Introvert.'
    },
    {
        fullName: 'Douglas S. Evans',
        nickName: 'Douglas',
        age: 9,
        bio: 'Social media evangelist. Freelance pop culture advocate. Alcohol trailblazer.'
    },
];

export default function Kids() {
    const classes = useStyles();

    return (
        <>
        <Grid container spacing={3}>
            {kids && kids.map(item => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/assets/images/child.jpg"
                                    title="kid"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.nickName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
            
        </Grid>
        <Fab className={classes.fab} color='primary'><Add/></Fab>
        </>
    );
}