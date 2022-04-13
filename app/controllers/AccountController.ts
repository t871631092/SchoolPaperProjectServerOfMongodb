import { Controller, Ctx, Get, Post, RequestParam } from "koa-controllers";
import * as Koa from 'koa';
import { AuthVerify } from "../decorator/authentication";
import { getModelForClass } from "@typegoose/typegoose";
import { IUser, User } from "../models/user.model";
import { Result } from "../models/result.model";
import { Session } from "koa-session";
const Base_Url = '/account'

const UserModel = getModelForClass(User)

@Controller
export default class AccountController {
    @Get(Base_Url + '/islogin')
    public async islogin(@Ctx ctx: Koa.BaseContext) {
        if (ctx.session?.islogin) {
            const user = await UserModel.findOne({ id: ctx.session.id })
            ctx.body = new Result(
                true, '', {
                nickname: ctx.session.nickname,
                locations: user?.locations
            })
        }else{
            ctx.body = new Result()._success(false);
        }
    }
    // @AuthVerify('user')
    @Post(Base_Url + '/login')
    public async userLogin(@Ctx ctx: Koa.BaseContext, @RequestParam('username', { required: true }) username: string, @RequestParam('password', { required: true }) password: string, @RequestParam('gps') gps: number[]) {
        const user = await UserModel.findOne({ userName: username });
        if (user == null) {
            ctx.body = new Result()._success(false)._msg('user not found')
        } else {
            if (user.passWord == password) {
                (ctx.session as Session).islogin = true;
                (ctx.session as Session).role = user.role;
                (ctx.session as Session).id = user._id;
                (ctx.session as Session).username = user.userName;
                (ctx.session as Session).nickname = user.nickName;
                await UserModel.findByIdAndUpdate(user._id, { gps: gps, lastlogin: new Date() });
                ctx.body = new Result()._msg('login success')._success(true)._data({ locations: user.locations, nickname: user.nickName })
            } else {
                ctx.body = new Result()._success(false)._msg('wrong password')
            }
        }

    }
    // @AuthVerify('user')
    @Post(Base_Url + '/register')
    public async userRegister(@Ctx ctx: Koa.BaseContext, @RequestParam('username', { required: true }) username: string, @RequestParam('password', { required: true }) password: string, @RequestParam('nickname', { required: true }) nickname: string, @RequestParam('email', { required: true }) email: string) {
        const user = await UserModel.findOne({ userName: username });
        if (user == null) {
            await UserModel.create(new User()._addDate(new Date())._nickName(nickname)._userName(username)._passWord(password)._email(email)._role('user'))
            ctx.body = new Result()._success(true);
        } else {
            console.log(user)
            ctx.body = new Result()._success(false)._msg('wrong password')
        }
    }
    @AuthVerify('user')
    @Post(Base_Url + '/changepassword')
    public async userChangePw(@Ctx ctx: Koa.BaseContext) {
        ctx.body = new Result()._success(true)._msg('wrong password')
    }
    @AuthVerify('user')
    @Post(Base_Url + '/saveaddress')
    public async userUpdateAddress(@Ctx ctx: Koa.BaseContext, @RequestParam('locations', { required: false }) locations: string[]) {
        console.log('locations')
        console.log(locations)
        await UserModel.findByIdAndUpdate(ctx.session?.id, { locations: locations } as IUser)
        ctx.body = new Result()._success(true);
    }
}