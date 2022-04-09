import Koa = require('koa');
import { useControllers } from 'koa-controllers';
const session = require('koa-session');
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { User } from "./models/user.model";
import './mongoUtil/db';

const app = new Koa();
const UserModel = getModelForClass(User)
UserModel.findOne({ role: 'admin' }, (error, res) => {
    console.log(res)
    if (res == null) {
        UserModel.create(new User()._userName('admin')._passWord('admin')._nickName('admin')._role('admin'));
    }
})
UserModel.findOne({ role: 'user', userName: 'user' }, (error, res) => {
    console.log(res)
    if (res == null) {
        UserModel.create(new User()._userName('user')._passWord('user')._nickName('user')._role('user'));
    }
})
useControllers(app, __dirname + '/controllers/*.ts', {
    multipart: {
        dest: './uploads'
    }
});
app.listen(8080);


app.use(session(app));