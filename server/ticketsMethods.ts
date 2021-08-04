import { motorcycleTicket } from './models/motorcycleTicket.class';
import { carTicket } from './models/carTicket.class';
import { cashTicket } from './models/cashTicket.class';
import { lostTicket } from './models/lostTicket.class';
import { ticket } from "./models/ticket.class";
var sample = require("lodash.sample");
var factoryClasses: any = {
  "lostTicket": lostTicket,
  "carTicket":  carTicket,
  "motorcycleTicket": motorcycleTicket,
  "cashTicket" : cashTicket   
}
  export function  validateTicket(ticket: any) {
    return !(ticket instanceof lostTicket);
  }

  export function generateTicket() {
    let newType = sample(Object.keys(factoryClasses));
    let newTicket = new factoryClasses[newType]();
    console.log(newTicket);
    return newTicket;
  }

  export function checkAnyNotValidated(tickets:ticket[]){
    return tickets.some((ticketToCheck: { isValidated: boolean; }) => ticketToCheck.isValidated == false);
  }

