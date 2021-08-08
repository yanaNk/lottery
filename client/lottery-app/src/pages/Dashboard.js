import React,{ useState,useEffect }  from 'react';
import { removeUserSession } from '../Utils/Common';
import axios from "axios";
import MenuToolBar from './ToolBar';
import Button from '@material-ui/core/Button';
import TicketsList from './TicketsList';
import Spinner from 'react-spinner-material';

function Dashboard(props) {
    const [loading, setLoading] = useState(false);
    const [errorNow, setError] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});
   
    const loginOutStyle ={
      float:"right",
      marginTop:"10px"
    };
    const getTicketList = () => {
      setError(null);
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}/allTickets`)
        .then((data) => {
          setTickets(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(
            "Something went wrong. Please try again later." +
              error?.response?.data?.message
          );
          console.log(errorNow)
        });
  };
    useEffect(() => setTickets(getTicketList()), []);
   
    function handleAdd() {
        const newList = tickets.concat({...ticket});
        setTickets(newList);
      }

    
   
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  const purchase = () => {
    setError(null);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/purchase`)
      .then((data) => {
        alert("ticketId " + data.data);
        setLoading(false);
        getTicket(data.data);
        handleAdd();
        
      })
      .catch((error) => {
        setLoading(false);
        if (error.response != null) {
          setError(
            "Something went wrong. Please try again later." +
              error?.response?.data?.message
          );
        }
      });
  };
  
  const getTicket = (id) => {
    setError(null);
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/getTicket`, {
        params: { ticketId: id },
      })
      .then((data) => {
        setLoading(false);
        setTicket(data.data);
        getTicketList();
      })
      .catch((error) => {
        setLoading(false);
        setError(
          "Something went wrong. Please try again later." +
            error?.response?.data?.message
        );
      });
};

  return (
    <>
     <MenuToolBar/>
      <Button style={loginOutStyle} variant="contained" color="inherit" onClick={handleLogout}>Logout</Button>
      <div>
      {loading ? <Spinner radius={120} color={"#333"} stroke={2} visible={true}/> :  <p/>  }
      <TicketsList tickets={tickets}/> 
      <Button variant="contained" color="secondary" onClick={purchase} >purchase</Button>
    </div>
    </>
    
  );
}

export default Dashboard;