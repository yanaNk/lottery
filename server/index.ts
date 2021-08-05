import {
  checkAnyNotValidated,
  generateTicket,
  validateTicket,
} from "./ticketsMethods";
import { userList } from "./userLists";
import {
  refreshTokens,
  COOKIE_OPTIONS,
  generateToken,
  generateRefreshToken,
  getCleanUser,
  verifyToken,
  clearTokens,
  handleResponse,
} from "./utils";
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
app.use(cors());

app.post("/users/signin", function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return handleResponse(req, res, 400, {}, "Username and Password required.");
  }

  const userData = userList.find(
    (x) => x.username === user && x.password === pwd
  );

  // return 401 status if the credential is not matched
  if (!userData) {
    return handleResponse(req, res, 401, {}, "Username or Password is Wrong.");
  }

  // get basic user details
  const userObj = getCleanUser(userData);

  // generate access token
  const tokenObj = generateToken(userData);

  // generate refresh token
  const refreshToken = generateRefreshToken(userObj?.userId) || 0;

  // refresh token list to manage the xsrf token
  if (refreshToken != null)
    (refreshTokens as any)[refreshToken] = tokenObj?.xsrfToken;

  // set cookies
  //res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
  res.cookie("XSRF-TOKEN", tokenObj?.xsrfToken);

  return handleResponse(
    req,
    res,
    200,
    {
      user: userObj,
      token: tokenObj?.token,
      expiredAt: tokenObj?.expiredAt,
    },
    ""
  );
});

app.post("/users/logout", (req, res) => {
  clearTokens(req, res);
  return handleResponse(req, res, 204, {}, "");
});
var ticketsLists: any[] = [];

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
