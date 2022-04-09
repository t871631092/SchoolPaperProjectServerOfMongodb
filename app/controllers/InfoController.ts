import { Controller, Ctx, Get, Post } from "koa-controllers";
import * as Koa from 'koa';
import { AuthVerify } from "../decorator/authentication";
const Base_Url = '/info'
@Controller
export default class InfoController {
    @AuthVerify('admin')
    @Get(Base_Url+'/day30')
    public async getUserDay30Register(@Ctx ctx: Koa.BaseContext){
        console.log('islogin')
    }
    @AuthVerify('admin')
    @Post(Base_Url+'/city30')
    public async getCityDay30Add(@Ctx ctx: Koa.BaseContext){

    }
    @AuthVerify('admin')
    @Post(Base_Url+'/location')
    public async getUserGpsMap(@Ctx ctx: Koa.BaseContext){

    }

}