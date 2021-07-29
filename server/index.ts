import {
  checkAnyNotValidated,
  generateTicket,
  validateTicket,
} from "./ticketsMethods";
import express from "express";
import bodyParser from "body-parser";
import { json } from "body-parser";

var app = express();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());

var ticketsLists: any[] = [];
app.get("/notfication", (req, res, next) => {
  let result = checkAnyNotValidated(ticketsLists);
  res.send(result);
});

app.get("/validate/:ticketId", (req, res, next) => {
  let relevantTicketindex = ticketsLists.findIndex(
    (ticketToFind) => ticketToFind.id == req.query.ticketId
  );
  let isValidated = validateTicket(ticketsLists[relevantTicketindex]);
  ticketsLists[relevantTicketindex].isValidated = isValidated;
  res.send(isValidated);
});
app.post("/purchase", function (req, res) {
  console.log("body is ", req.body);
  let newTicket = generateTicket();
  ticketsLists.push(newTicket);
  res.send(newTicket.id);
});
