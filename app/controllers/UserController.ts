import { Controller, Ctx, Get, Post } from "koa-controllers";
import * as Koa from 'koa';
import { AuthVerify } from "../decorator/authentication";
const Base_Url = '/user'
@Controller
export default class UserController {
    @AuthVerify('admin')
    @Get(Base_Url+'/get')
    public async getUser(@Ctx ctx: Koa.BaseContext){
        console.log('islogin')
    }
    @AuthVerify('admin')
    @Post(Base_Url+'/del')
    public async delUser(@Ctx ctx: Koa.BaseContext){

    }
    @AuthVerify('admin')
    @Post(Base_Url+'/changpw')
    public async updateUserPassWord(@Ctx ctx: Koa.BaseContext){

    }
    @AuthVerify('admin')
    @Post(Base_Url+'/add')
    public async addUser(@Ctx ctx: Koa.BaseContext){

    }

}