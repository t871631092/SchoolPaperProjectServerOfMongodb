import { Controller, Ctx, Req, Body, Get, Post, Delete, Query, Flow, Params, Version, Session as Session2 } from 'amala';
import * as Koa from 'koa';
import { AuthVerify } from "../decorator/authentication";
import { getModelForClass } from "@typegoose/typegoose";
import { IUser, User } from "../models/user.model";
import { Result } from "../models/result.model";
import { Session } from "koa-session";
import { Record } from '../models/record.model';
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
            const user = await UserModel.findOne({ id: ctx.session.id })
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
            return new Result(
                true, '', {
                nickname: ctx.session.nickname,
                locations: user?.locations
            })
        } else {
            return new Result()._success(false);
        }
    }
    // @AuthVerify('user')
    @Post('/login')
    public async userLogin(@Ctx() ctx: any, @Body('username') username: string, @Body('password') password: string, @Body('gps') gps: number[], @Session2() session) {
        console.log(session)
        const user = await UserModel.findOne({ userName: username });
        if (user == null) {
            return new Result()._success(false)._msg('user not found')
        } else {
            if (user.passWord == password) {
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
                return new Result()._success(false)._msg('wrong password')
            }
        }

    }
    // @AuthVerify('user')
    @Post('/register')
    public async userRegister(@Ctx() ctx: Koa.BaseContext, @Params('username') username: string, @Params('password') password: string, @Params('nickname') nickname: string, @Params('email') email: string) {
        const user = await UserModel.findOne({ userName: username });
        if (user == null) {
            await UserModel.create(new User()._addDate(new Date())._nickName(nickname)._userName(username)._passWord(password)._email(email)._role('user'))
            ctx.body = new Result()._success(true);
        } else {
            console.log(user)
            ctx.body = new Result()._success(false)._msg('wrong password')
        }
    }
    // @AuthVerify('user')
    @Post('/changepassword')
    public async userChangePw(@Ctx() ctx: Koa.BaseContext) {
        ctx.body = new Result()._success(true)._msg('wrong password')
    }
    // @AuthVerify('user')
    @Post('/saveaddress')
    public async userUpdateAddress(@Ctx() ctx: Koa.BaseContext, @Params('locations') locations: string[]) {
        console.log('locations')
        console.log(locations)
        await UserModel.findByIdAndUpdate(ctx.session?.id, { locations: locations } as IUser)
        ctx.body = new Result()._success(true);
    }
    // @AuthVerify('user')
    @Get('/logout')
    public async userLoginOut(@Ctx() ctx: any) {
        ctx.session = null;
        ctx.body = new Result()._success(true);
    }
}