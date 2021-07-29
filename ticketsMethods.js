var lostTicket = require('./models/lostTicket.class.ts');
var ticket = require('./models/ticket.class.ts');

  module.exports={  validateTicket: function(ticket) {
    return ticket instanceof lostTicket;
  }}

//   generateTicket: function () {
//     let newTicket = new lostTicket();
//     return newTicket;
//   },

//   checkAnyNotValidated: function(tickets){
//     return tickets.some(ticketToCheck => ticketToCheck.isValidated == false);
//   }
// }
