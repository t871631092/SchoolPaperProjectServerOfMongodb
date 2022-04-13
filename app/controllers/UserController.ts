import { Controller, Ctx, Get, Post, RequestParam } from "koa-controllers";
import * as Koa from 'koa';
import { AuthVerify } from "../decorator/authentication";
import { User } from "../models/user.model";
import { Result } from "../models/result.model";
import { getModelForClass } from "@typegoose/typegoose";
const Base_Url = '/user'
const UserModel = getModelForClass(User)
@Controller
export default class UserController {
    // @AuthVerify('admin')
    @Post(Base_Url + '/getuser')
    public async getUser(@Ctx ctx: Koa.BaseContext, @RequestParam('page') page: number, @RequestParam('limit') limit: number) {
        console.log('getuser')
        const data = await UserModel.find({}, { passWord: 0 }).skip((page - 1) * limit).limit(limit);
        console.log(data)
        ctx.body = new Result()._success(true)._data(data);
    }
    // @AuthVerify('admin')
    @Post(Base_Url + '/del')
    public async delUser(@Ctx ctx: Koa.BaseContext, @RequestParam('id') id: string) {
        await UserModel.findByIdAndDelete(id)
        ctx.body = new Result()._success(true);
    }
    // @AuthVerify('admin')
    @Post(Base_Url + '/changpw')
    public async updateUserPassWord(@Ctx ctx: Koa.BaseContext) {

    }
    // @AuthVerify('admin')
    @Post(Base_Url + '/add')
    public async addUser(@Ctx ctx: Koa.BaseContext) {

    }

}