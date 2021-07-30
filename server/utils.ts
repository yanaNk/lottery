import { sign, verify, VerifyOptions } from 'jsonwebtoken';
import moment from 'moment';
import { generate } from 'rand-token';
import ms from 'ms';

const dev = process.env.NODE_ENV !== 'production';

// refresh token list to manage the xsrf token
const refreshTokens = {};

// cookie options to create refresh token
const COOKIE_OPTIONS = {
  // domain: "localhost",
  httpOnly: true,
  secure: !dev,
  signed: true
};

// generate tokens and return it
function generateToken(user: { userId: any; name: any; username: any; isAdmin: any; }) {
  if (!user) return null;

  const u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };

  // generat xsrf token and use it to generate access token
  const xsrfToken = generate(24);

  // create private key by combining JWT secret and xsrf token
  const privateKey = process.env.JWT_SECRET + xsrfToken;

  // generate access token and expiry date
  const token = sign(u, privateKey, { expiresIn: process.env.ACCESS_TOKEN_LIFE });

  // expiry time of the access token
  const expiredAt = moment().add(ms(5 ), 'ms').valueOf();

  return {
    token,
    expiredAt,
    xsrfToken
  }
}

// generate refresh token
function generateRefreshToken(userId: any) {
  if (!userId) return null;

  return sign({ userId }, "jj" , { expiresIn: process.env.REFRESH_TOKEN_LIFE });
}

// verify access token and refresh token
function verifyToken(token: string, xsrfToken = '', cb: VerifyOptions & { complete: true; }) {
  const privateKey = process.env.JWT_SECRET + xsrfToken;
  verify(token, privateKey, cb);
}

// return basic user details
function getCleanUser(user:any) {
  if (!user) return null;

  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
}

// handle the API response
function handleResponse(req: any, res: { sendStatus: (arg0: number) => any; status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): any; new(): any; }; }; }, statusCode: any, data: {}, message: string) {
  let isError = false;
  let errorMessage = message;
  switch (statusCode) {
    case 204:
      return res.sendStatus(204);
    case 400:
      isError = true;
      break;
    case 401:
      isError = true;
      errorMessage = message || 'Invalid user.';
      clearTokens(req, res);
      break;
    case 403:
      isError = true;
      errorMessage = message || 'Access to this resource is denied.';
      clearTokens(req, res);
      break;
    default:
      break;
  }
  const resObj:any= data;
  if (isError && resObj !)  {
    resObj.error = true;
    resObj.message = errorMessage;
  }
  return res.status(statusCode).json(resObj);
}

// clear tokens from cookie
function clearTokens(req:any, res:any) {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  //delete refreshTokens[refreshToken];
  res.clearCookie('XSRF-TOKEN');
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
}

export default {
  refreshTokens,
  COOKIE_OPTIONS,
  generateToken,
  generateRefreshToken,
  verifyToken,
  getCleanUser,
  handleResponse,
  clearTokens
}