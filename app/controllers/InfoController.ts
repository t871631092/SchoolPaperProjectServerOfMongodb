import { Controller, Ctx, Get, Post } from "koa-controllers";
import * as Koa from 'koa';
import { AuthVerify } from "../decorator/authentication";
import { Result } from "../models/result.model";
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { User } from "../models/user.model";
const Base_Url = '/info'

const UserModel = getModelForClass(User)
@Controller
export default class InfoController {
    // @AuthVerify('admin')
    @Get(Base_Url + '/day30')
    public async getUserDay30Register(@Ctx ctx: Koa.BaseContext) {
        let days = 30;
        const data: any[] = [] ;
        const date = new Date();
        while (days > 0) {
            let lastdate = new Date().setDate(date.getDate() - 1);
            let result = await UserModel.find({ addDate: { $lt: date, $gt: lastdate } })
            if (result) {
                let datestring = date.getDate();
                let d:any = {};
                d[datestring] = result.length
                data.push(d)
            }
            days -=1
            date.setDate(date.getDate() - 1);
        }
        ctx.body = new Result()._data(data)._success(true);
    }
    @AuthVerify('admin')
    @Post(Base_Url + '/city30')
    public async getCityDay30Add(@Ctx ctx: Koa.BaseContext) {

    }
    @AuthVerify('admin')
    @Post(Base_Url + '/location')
    public async getUserGpsMap(@Ctx ctx: Koa.BaseContext) {

    }

}