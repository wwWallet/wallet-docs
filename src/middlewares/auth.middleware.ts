import { Request, Response, NextFunction } from "express";

import { jwtVerify } from 'jose';
import config from "../../config/config.dev";

export interface AppTokenUser {
	did: string;
}

function getCookieDictionary(cookies: any) {
  const cookieList = cookies.split('; ');
  let cookieDict: any = {};
  for (const cookie of cookieList) {
    const key = cookie.split('=')[0] as string;

    const val = cookie.split('=')[1];
    cookieDict[key] = val;
    
  }
  return cookieDict;
}

async function verifyApptoken(jwt: string): Promise<{valid: boolean, payload: any}> {
	const secret = new TextEncoder().encode(config.appSecret);
  try {
    const { payload, protectedHeader } = await jwtVerify(jwt, secret);
    return { valid: true, payload: payload };
  }
  catch (err) {
    console.log('Signature verification failed');
    return { valid: false, payload: {}}
  }
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
	let cookieDict;
	let jwt: any;
	const cookie = req.headers.cookie;
	console.log("Cookie = ", cookie)
  if (req.headers != undefined && cookie != undefined) {
    cookieDict = getCookieDictionary(req.headers.cookie);
    if (cookieDict['token'] == undefined) {
			console.log("Unauthorized access to ", jwt);
			res.status(401).send(); // Unauthorized
      return;
    }
    // // store invitation as a session variable
    // if (cookieDict['invitation'] != undefined) {
    //   req.invitation = cookieDict['invitation'];
    // }
    jwt = cookieDict['token'];
  }
  else {
		console.log("Unauthorized access to ", jwt);
		res.status(401).send(); // Unauthorized
    return;
  }

	verifyApptoken(jwt).then(({valid, payload}) => {
		if (valid === false) {
			console.log("Unauthorized access to ", jwt);
			res.status(401).send(); // Unauthorized
			return;
		}

		// success
		req.user = {
			did: ""
		} as AppTokenUser;
		req.user.did = (payload as AppTokenUser).did;
		return next();
	})
	.catch(e => {
		console.log("Unauthorized access to ", jwt);
		res.status(401).send(); // Unauthorized
		return;
	});
}