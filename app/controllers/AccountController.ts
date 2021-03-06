import { Controller, Ctx, Req, Body, Get, Post, Delete, Query, Flow, Params, Version, Session as Session2 } from 'amala';
import * as Koa from 'koa';
import { AuthVerify, LoginVerify } from "../decorator/authentication";
import { getModelForClass } from "@typegoose/typegoose";
import { IUser, User } from "../models/user.model";
import { Result } from "../models/result.model";
import { Session } from "koa-session";
import { Record } from '../models/record.model';
import { verify } from 'crypto';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const md5 = require("md5");
const Base_Url = '/account'

const UserModel = getModelForClass(User)
const RecordModel = getModelForClass(Record)
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
@Controller('/account')
export class AccountController {
    @Get('/islogin')
    public async islogin(@Ctx() ctx: Koa.BaseContext) {
        console.log('islogin call', ctx.session)
        if (ctx.session?.islogin) {
            const user = await UserModel.findOne({ _id: ctx.session.id })
            const rec = await RecordModel.findOne({ addDate: formatDate(new Date()) })
            if (rec) {
                rec.time = rec ? (rec.time as any) + 1 : 1
                rec.save();
            } else {
                const record = new RecordModel({
                    addDate: formatDate(new Date()),
                    time: 1
                })
                record.save();
            }
            console.log(user)
            return new Result(
                true, '', {
                nickname: ctx.session.nickname,
                locations: user?.locations
            })
        } else {
            return new Result()._success(false);
        }
    }
    @Post('/login')
    public async userLogin(@Ctx() ctx: any, @Body('username') username: string, @Body('password') password: string, @Body('gps') gps: number[], @Session2() session) {
        console.log(ctx.session, username, password)
        const user = await UserModel.findOne({ userName: username });
        if (user == null) {
            return new Result()._success(false)._msg('???????????????')
        } else {
            if (user.role != 'admin') {
                // return new Result()._success(false)._msg('?????????????????????!');
            }

            if (user.passWord == md5(password)) {
                (ctx.session as Session).islogin = true;
                (ctx.session as Session).role = user.role;
                (ctx.session as Session).id = user._id;
                (ctx.session as Session).username = user.userName;
                (ctx.session as Session).nickname = user.nickName;
                await UserModel.findByIdAndUpdate(user._id, { gps: gps, lastlogin: new Date() });
                console.log(ctx.session)
                console.log(session)
                return new Result()._msg('login success')._success(true)._data({ locations: user.locations, nickname: user.nickName })
            } else {
                return new Result()._success(false)._msg('????????????')
            }
        }

    }
    @Post('/register')
    public async userRegister(@Ctx() ctx: Koa.BaseContext, @Body('username') username: string, @Body('password') password: string, @Body('nickname') nickname: string, @Body('email') email: string, @Body('verify') verify: string) {
        console.log(username, password, nickname, email,verify)
        const user = await UserModel.findOne({ userName: username });
        if (user == null) {
            const useremail = await UserModel.findOne({ email: email, verify: verify });
            if (useremail == null) {
                return new Result()._success(false)._msg('???????????????')
            }
            useremail._addDate(new Date())._nickName(nickname)._userName(username)._passWord(md5(password))._email(email)._role('user');
            await useremail.save();
            return new Result()._success(true)._msg('????????????');
        } else {
            console.log(user)
            return new Result()._success(false)._msg('??????????????????')
        }
    }
    @Post('/changepassword')
    @Flow([LoginVerify])
    public async userChangePw(@Ctx() ctx: Koa.BaseContext, @Body('old') old: string, @Body('pw') pw: string) {
        console.log(old, pw);
        const user = await UserModel.findOne({ _id: ctx.session?.id });
        if (user?.passWord == md5(old)) {
            user?._passWord(md5(pw));
            user?.save();
            return new Result()._success(true)._msg('success')
        } else {
            return new Result()._success(false)._msg('wrong password')
        }
    }
    @Post('/saveaddress')
    @Flow([LoginVerify])
    public async userUpdateAddress(@Ctx() ctx: Koa.BaseContext, @Body('locations') locations: string) {
        console.log('locations', ctx)
        console.log(locations.split(','))
        let user = await UserModel.findOne({ _id: ctx.session?.id });
        if (user) {
            (user as User).locations = locations.split(',');
            user.save();
            ctx.body = new Result()._success(true);
        } else {
            ctx.body = new Result()._success(false);
        }
    }
    @Flow([LoginVerify])
    @Get('/logout')
    public async userLoginOut(@Ctx() ctx: any) {
        ctx.session = null;
        return new Result()._success(true);
    }
    @Post('/sendemail')
    public async sendemail(@Ctx() ctx: Koa.BaseContext,@Body('email') email: string) {
        let user = await UserModel.findOne({ email: email });
        if(user!=null){
            return new Result()._success(false)._msg('???????????????');
        }
        // ???????????? SMTP ?????????
        return await new Promise((res=>{
            var transport = nodemailer.createTransport(smtpTransport({
                host: "smtp.mxhichina.com", // qq????????????
                secure: false, // ?????? SSL
                secureConnection: false, // ?????? SSL
                port: 25, // SMTP ??????
                auth: {
                    user: "test@papaz.me", // ??????   ?????????????????????????????????
                    pass: "Abc123456!"    // ??????   ???????????????SMPT???????????????
                },
                tls: {
                    ciphers: 'SSLv3'
                }
            }));
    
    
            // ??????????????????  ????????????html ??????????????????
            let htmlcon = '<div style="background:-webkit-linear-gradient(-45deg,  #5edac1 0%,#327dda 100%,#1a7a93 100%);width:100%;height:500px;" >' +
                '<div style="width: 200px;height:200px;background:url(\'https://avatars5.githubusercontent.com/u/22450881?v=4\') no-repeat; background-size:contain;background-color:#fff; margin:0 auto;position:relative;top:50px; border-radius:5px; box-shadow:2px 2px 2px rgba(1,138,110,.3)">' +
                '<P style="color:#fff;font-weight:900;text-align:center;position:absolute;bottom:-100px;width: 100%;font-size: 36px;text-shadow:3px 2px 2px rgba(1,138,110,.6)">??????App ?????????</P>' +
                '<a ' + "" + "" + '" target="_blank" style="background:-webkit-linear-gradient(-45deg,  #4cb1dd 0%,#4bb2dd 100%,#1a7a93 100%);display:block;padding:10px;text-decoration:none;color:#fff;text-align:center;letter-spacing:4px;border-radius:5px;box-shadow:0px 2px 2px 1px rgba(1,138,110,.15);box-sizing:border-box; position:absolute;bottom:-150px;width:200px;">' + '123456' + '</a>' +
                '</div>' +
                '</div>';
    
            var mailOptions = {
                from: "test@papaz.me", // ????????????
                to: ["971340511@qq.com", email], // ????????????
                subject: '?????????', // ??????
                text: "",
                html: htmlcon // html ??????
            }
            transport.sendMail(mailOptions, function (error, response) {
                let result = new Result()._success(false)._msg('????????????');
                if (error) {
                    console.log("fail: " + error);
                    console.log("????????????");
                } else {
                    console.log("????????????");
                    UserModel.create(new User()._email(email)._verify('123456'));
                    result = new Result()._success(true)._msg('????????????');
                }
                console.log(response)
                transport.close(); // ??????????????????????????????
                res(result);
            });
        }))
       
    }

}