import Koa = require('koa');
import { useControllers } from 'koa-controllers';
const session = require('koa-session');
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { IUser, User } from "./models/user.model";
import './mongoUtil/db';

const app = new Koa();
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: true, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
  islogin: false,
};

app.use(session(app));

useControllers(app, __dirname + '/controllers/*.ts', {
  multipart: {
    dest: './uploads'
  }
});
// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     await UserModel.create({'login': '11111', 'passWord': '123',userName:'asvb1111111111' } as User);
//     ctx.response.body = await UserModel.find({});
//     console.log(ctx.response.body)
//     console.log('1243521343')
// });
app.listen(8080);
