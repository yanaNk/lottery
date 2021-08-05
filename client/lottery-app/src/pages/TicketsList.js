import React,{ useState,useEffect }  from 'react';
import Ticket from './Ticket';

function TicketsList({tickets}) {
    
    if(tickets !=null){
  return (tickets?.map((item) => {
    return <Ticket key={item?.id} ticket={item} />;
  }));
}
else {
    return(null);
}
        
        } 
export default TicketsList;