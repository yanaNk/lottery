import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions } from '@material-ui/core';
import Price from './Price';
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
export default function Tikcet({ticket}){
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    console.log(ticket);
    return (
        <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
           {ticket.id}
          </Typography>
          <Typography variant="h5" component="h2">
            {bull}{ticket.purchaseDate}
          </Typography>
          <Typography className={classes.pos} color="textSecondary" component={"div"}>
            {ticket?.isValidated ?  "Validated" : "Need to be validated" }
            {ticket?.isValidated ? <Price price ={ticket?.price}></Price> : <p/>}
          </Typography>
        </CardContent>
        <CardActions>
          
        </CardActions>
      </Card>
    )
}