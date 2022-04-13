import Koa = require('koa');
import { useControllers } from 'koa-controllers';
const session = require('koa-session');
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { User } from "./models/user.model";
import cors = require('koa2-cors');
import './mongoUtil/db';

const app = new Koa();
app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return '*';
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  }));
const UserModel = getModelForClass(User)
UserModel.findOne({ role: 'admin' }, (error, res) => {
    if (res == null) {
        UserModel.create(new User()._userName('admin')._passWord('admin')._nickName('admin')._role('admin'));
    }
})
UserModel.findOne({ role: 'user', userName: 'user' }, (error, res) => {
    if (res == null) {
        UserModel.create(new User()._userName('user')._passWord('user')._nickName('user')._role('user'));
    }
})

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
app.use(session(app));
useControllers(app, __dirname + '/controllers/*.ts', {
    multipart: {
        dest: './uploads'
    }
});
app.listen(8088);

