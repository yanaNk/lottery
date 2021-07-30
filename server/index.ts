import {
  checkAnyNotValidated,
  generateTicket,
  validateTicket,
} from "./ticketsMethods";
const {
  refreshTokens,
  COOKIE_OPTIONS,
  generateToken,
  generateRefreshToken,
  getCleanUser,
  verifyToken,
  clearTokens,
  handleResponse,
} = require("./utils");
import express from "express";
import bodyParser from "body-parser";
import { json } from "body-parser";
import cors from "cors";

var app = express();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.post("/users/logout", (req, res) => {
  clearTokens(req, res);
  return handleResponse(req, res, 204);
});
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
