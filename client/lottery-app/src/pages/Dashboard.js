import React,{ useState,useEffect }  from 'react';
import { removeUserSession } from '../Utils/Common';
import axios from "axios";
import MenuToolBar from './ToolBar';
import Button from '@material-ui/core/Button';
import TicketsList from './TicketsList';
import Spinner from 'react-spinner-material';

function Dashboard(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [relevantId, setRelevantId] = useState(0);
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState('');
   
    useEffect(() => setTickets(getTicketList()), []);
   
    function handleAdd() {
        const newList = tickets.concat({ ticket });
        setTickets(newList);
      }
    const getTicketList = () => {
        setError(null);
        setLoading(true);
        axios
          .get("http://localhost:3000/allTickets")
          .then((data) => {
            setTickets(data.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            setError(
              "Something went wrong. Please try again later." +
                error.response.data.message
            );
          });
    };
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  const purchase = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:3000/purchase")
      .then((data) => {
        setRelevantId(data.data);
        alert("ticketId " + relevantId);
        setLoading(false);
        handleAdd();
        getTicketList();
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
  const validate = () => {
      setError(null);
      setLoading(true);
      axios
        .get("http://localhost:3000/validate", {
          params:{ticketId:relevantId}
        })
        .then((data) => {
          alert(data.data);
          setLoading(false);
          getTicketList();
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401)
            setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
        });
  };

  return (
    <>
     <MenuToolBar/>
      <Button variant="contained" color="inherit" onClick={handleLogout}>Logout</Button>
      <div>
      {loading ? <Spinner radius={120} color={"#333"} stroke={2} visible={true}/> : <TicketsList tickets={tickets}/> }
      <Button variant="contained" color="inherit" onClick={purchase} >purchase</Button>
      <Button variant="contained" color="inherit" onClick={validate}>validate Ticket</Button>
    </div>
    </>
    
  );
}

export default Dashboard;