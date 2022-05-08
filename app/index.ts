import Koa = require('koa');
const session = require('koa-session');
import { bootstrapControllers } from 'amala';
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { User } from "./models/user.model";
import cors = require('koa2-cors');
import './mongoUtil/db';
import { AccountController } from './controllers/AccountController';
import { UserController } from './controllers/UserController';
import { InfoController } from './controllers/InfoController';
import { Record } from './models/record.model';
const md5 = require("md5");

const koaApp = new Koa();

koaApp.use(cors({
    origin: function (ctx) {
        console.log(ctx.url)
        if (ctx.url === '/test') {
            console.log('test')
            return false;
        }
        return 'http://localhost:8080';
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
}));

koaApp.use(session({
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: false, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false, /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
}, koaApp));
const UserModel = getModelForClass(User)
UserModel.findOne({ role: 'admin' }, (error, res) => {
    if (res == null) {
        UserModel.create(new User()._userName('admin')._passWord(md5('admin'))._nickName('admin')._role('admin'));
    }
});
UserModel.findOne({ role: 'user', userName: 'user' }, (error, res) => {
    if (res == null) {
        UserModel.create(new User()._userName('user')._passWord(md5('user'))._nickName('user')._role('user'));
    }
});
(async function () {
    const RecordModel = getModelForClass(Record)
    const recordCount = await RecordModel.count({})
    if (recordCount < 60) {
        let d = new Date('2022-06-01');
        let i = 0;
        while (i < 60) {
            let month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            const datestr = [year, month, day].join('-');
            await RecordModel.create(new Record()._addDate(datestr)._time(Math.floor(Math.random() * 1000)));
            d.setDate(d.getDate() - 1);
            i++;
        }
    }
    const UserCount = await UserModel.count({})
    if (UserCount < 5000) {
        let d = new Date('2022-05-14');
        let i = 0;
        while (i < 60) {
            let month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            const datestr = [year, month, day].join('-');
            const a = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
            const address = Math.floor(Math.random() * (12 - 0 + 1)) + 0;
            const addresss = ['广州', '深圳', '上海', '杭州', '北京', '成都', '南京', '江门', '苏州', '香港', '澳门', '台湾']
            for (let x = 0; x < a; x++) {
                let addressstr = addresss[address]
                if (x < 50) {
                    addressstr = addresss[0]
                }
                await UserModel.create(new User()._userName('user' + a + x)._passWord(md5('password'))._nickName('user' + a + x)._role('user')._addDate(d)._locations([addressstr])._address([addressstr]));
            }
            d.setDate(d.getDate() - 1);
            i++;
        }
    }

    const { app, router } = await bootstrapControllers({
        app: koaApp,
        basePath: '/',
        controllers: [
            AccountController,
            UserController,
            InfoController
        ],
        attachRoutes: true,
        disableVersioning: true
    });
    app.listen(8088);


})();
