import { Controller, Ctx, Req, Body, Get, Post, Delete, Query, Flow, Params, Version } from 'amala';
import * as Koa from 'koa';
import { AuthVerify, UserVerify, AdminVerify, LoginVerify } from "../decorator/authentication";
import { User } from "../models/user.model";
import { Result } from "../models/result.model";
import { getModelForClass } from "@typegoose/typegoose";
const Base_Url = '/user'
const UserModel = getModelForClass(User)
@Controller('/user')
export class UserController {

    @Post('/getuser')
    @Flow([LoginVerify, AdminVerify])
    public async getUser(@Body('page') page: number, @Body('limit') limit: number, @Body('name') name: string, @Body('address') address: string, @Ctx() ctx: any) {
        const params: any = {};
        if (name) {
            params.userName = name;
        }
        if (address) {
            params.address = address;
        }
        const data = await UserModel.find(params, { passWord: 0 }).skip((page - 1) * limit).limit(limit);
        const count = await UserModel.count(params);
        console.log(data)
        return new Result()._success(true)._data(data)._count(count);
    }
    // @AuthVerify('admin')
    @Post('/del')
    public async delUser(@Ctx() ctx: Koa.BaseContext, @Params('id') id: string) {
        await UserModel.findByIdAndDelete(id)
        return new Result()._success(true);
    }
    // @AuthVerify('admin')
    @Post('/changpw')
    public async updateUserPassWord(@Ctx() ctx: Koa.BaseContext) {

    }
    // @AuthVerify('admin')
    @Post('/add')
    public async addUser(@Ctx() ctx: Koa.BaseContext) {

    }

}