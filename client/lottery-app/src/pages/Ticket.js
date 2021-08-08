import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { CardActions } from '@material-ui/core';
import Price from './Price';
import Button from '@material-ui/core/Button';
import Spinner from 'react-spinner-material';
import './Ticket.css';
const useStyles = makeStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
  });
  
export default function Tikcet({ticket}){
    const [loading, setLoading] = useState(false);
    const [errorNow, setError] = useState(null);
    const [validation,setValidate] = useState(ticket.isValidated)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const validate = () => {
      setError(null);
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}/validate`, {
          params: { ticketId: ticket.id },
        })
        .then((data) => {
          setLoading(false);
          setValidate(data.data.isValidated);
        })
        .catch((error) => {
          setLoading(false);
          setError(
            "Something went wrong. Please try again later." +
              error?.response?.data?.message
          );
          console.log(errorNow);
        });
  };
    return (
      <Card className="mat-card">
        <CardContent className="content">
          <Typography className="title" color="textSecondary" gutterBottom>
          {validation ? "Validated" : "Need to be validated"}
          </Typography>
          <Typography style={{marginBottom: "15px"}} variant="h5" component="h2">
            {bull}
            {ticket.purchaseDate}
          </Typography>

          <Typography className ="validateButton"
            component={"div"}
          >
            {loading ? <Spinner radius={120} color={"#333"} stroke={2} visible={true}/> :  <p/>  }
            {!validation ? (
              <Button variant="contained" color="primary" onClick={validate}>
                validate Ticket
              </Button>
            ) : (
              <p />
            )}
            </Typography>
            <Typography
            className={classes.pos}
            color="textSecondary"
            component={"div"}
          >
            {validation ? <Price price={ticket?.price}></Price> : <p />}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    );
}