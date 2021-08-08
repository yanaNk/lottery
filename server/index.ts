import {
  checkAnyNotValidated,
  generateTicket,
  validateTicket,
} from "./ticketsMethods";
import {
  checkUserExists,
  generateToken,
  getCleanUser,
  getRelevantAfterLogIn,
  getRelevantUser,
} from "./utils";
import express from "express";
import { urlencoded } from "body-parser";
import { json } from "body-parser";
import cors from "cors";
import { Server } from 'socket.io';
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
var app = express();
var count = 0;
var clientPort =3001;
var serverUrl =`http://localhost:${clientPort}`;
var secret = "ABCDEF$123";
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors({ origin: serverUrl }));
app.use(function (req:any, res, next) {
  var token = req.headers['authorization'];
  if (!token) return next(); 
 
  token = token.replace('Bearer ', '');
  verify(token, secret!, function (err: any, user: any) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user! = user; //set the user to req so other routes can use it
      next();
    }
  });
});
const server = app.listen(3000, () => console.log(`Listening Socket on 3000`));

const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket: any) => {
  if(interval){
    clearInterval(interval);
    count = 0;
  }
  interval = setInterval(() => sendNotfication(socket),120000);
  socket.on("disconnect",() =>{
    clearInterval(interval)
  })

});
var ticketsLists: any[] = [];
let interval: NodeJS.Timeout;
var sendNotfication = (socket: any) => {
  if (ticketsLists.length > 0) {
    if (ticketsLists.some((ticket) => ticket.isValidated == false)) {
      count++;
      socket.emit("fromServer",count );
    }
  }
  return;
};

app.post("/users/signin", function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password is required."
    });
  }
 
  let relevantUser = getRelevantUser(user,pwd)
  console.log(relevantUser);
  if (relevantUser == false) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is wrong."
    });
  }
 
  const token = generateToken(relevantUser);
  const userObj = getCleanUser(relevantUser);
  return res.json({ user: userObj, token });
});

app.get('/verifyToken', function (req, res) {
  var token = req.query.token;
  console.log("my token "+token);
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  verify(token.toString(), secret!, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
 
    
    if (!checkUserExists(user)) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    var relevantUser = getRelevantAfterLogIn(user)
    var userObj = getCleanUser(relevantUser);
    return res.json({ user: userObj, token });
  });
});

app.get("/allTickets",(req,res) =>{
  res.send(ticketsLists);
})
app.get("/notfication", (req, res, next) => {
  let result = checkAnyNotValidated(ticketsLists);
  res.send(result);
});

app.get("/validate", (req, res, next) => {
  let relevantTicketindex = ticketsLists.findIndex(
    (ticketToFind) => ticketToFind.id == req.query.ticketId
  );
  if (relevantTicketindex == -1) res.send(false);
  else {
    if (ticketsLists[relevantTicketindex].isValidated)
      res.send("already validated");
    validateTicket(ticketsLists[relevantTicketindex]);
    res.send(ticketsLists[relevantTicketindex]);
  }
});
app.post("/purchase", function (req, res) {
  console.log("purchase has been made ");
  let newTicket = generateTicket();
  ticketsLists.push(newTicket);
  res.send(newTicket.id);
});

app.get("/getTicket", (req, res, next) => {
  let relevantTicket = ticketsLists.find(
    (ticketToFind) => ticketToFind.id == req.query.ticketId
  );
  res.send(relevantTicket);
})
