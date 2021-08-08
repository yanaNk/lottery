import { sign, verify, VerifyOptions } from 'jsonwebtoken';
import { userList } from "./userLists";
require('dotenv').config();

var secret = "ABCDEF$123";;
export function generateToken(user: any) {
  if (!user) return null;

  const u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
  return sign(u, secret!, {
    expiresIn: 60 * 60 * 24 
  });
}

export function getCleanUser(user:any) {
  if (!user) return null;

  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
}

export function getRelevantUser(userName:string,password:string){
  let userIndex = userList.findIndex(
    (user) => user.username == userName && user.password == password
  );
  if (userIndex == -1) {
    return false;
  }
  return userList[userIndex];
}
 export function checkUserExists(userToCheck:any){
   return userList.findIndex(user =>user.userId == userToCheck.userId) != -1;
 }

 export function getRelevantAfterLogIn(userName:any){
  let userIndex = userList.findIndex(
    (user) => user.userId == userName.userId
  );
  if (userIndex == -1) {
    return false;
  }
  return userList[userIndex];
}


export default {
  generateToken,
  getCleanUser,
}