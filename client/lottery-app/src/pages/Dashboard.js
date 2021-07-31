import React,{ useState }  from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import axios from "axios";
import { render } from "react-dom";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Dashboard(props) {
  const user = getUser();
  const tickets =[];
  var relevantId = 0;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handle click event of logout button
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
        relevantId = data.data;
        console.log(this.relevantId);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.status === 401)
          setError(error?.response?.data?.message);
        else setError("Something went wrong. Please try again later.");
      });
  }
  const validate = () => {
      setError(null);
      setLoading(true);
      axios
        .get("http://localhost:3000/validate", {
          params:{ticketId:relevantId}
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401)
            setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
        });
  };

  return (
    <div>
      <header>
      <FontAwesomeIcon icon={faBell} />
      Welcome {user.name}!<br /><br />
      </header>
      <input type="button" onClick={handleLogout} value="Logout" />
      <div>
      <input type="button" onClick={purchase} value="purchase" />
      <input type="button" onClick={validate} value="validate Ticket" />
    </div>
    </div>
    
  );
}

export default Dashboard;