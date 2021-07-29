import { lostTicket } from './models/lostTicket.class';
import { ticket } from "./models/ticket.class";

  export function  validateTicket(ticket: any) {
    return ticket instanceof lostTicket;
  }

  export function generateTicket() {
    let newTicket = new lostTicket();
    return newTicket;
  }

  export function checkAnyNotValidated(tickets:ticket[]){
    return tickets.some((ticketToCheck: { isValidated: boolean; }) => ticketToCheck.isValidated == false);
  }

