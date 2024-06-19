
import passport from "passport";
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import con from "../models/database";
import dotenv from "dotenv";
dotenv.config();


const getToken = (req: Request) => {
  return req.cookies.token;
}

const jwtOptions: { jwtFromRequest: ReturnType<typeof getToken>, secretOrKey: string } = {
  jwtFromRequest: getToken,
  secretOrKey: `${process.env.JWT_SECRET}`,
};

const strategy = new Strategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const id: number = jwt_payload.id;
    const user = await con.getrow(`select * from users where user_id=${id} `);
    console.log(user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }

});

passport.use(strategy);
