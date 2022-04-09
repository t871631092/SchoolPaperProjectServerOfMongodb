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
    @AuthVerify('admin')
    @Get(Base_Url + '/day30')
    public async getUserDay30Register(@Ctx ctx: Koa.BaseContext) {
        let days = 30;
        const data: any[] = [];
        const date = new Date();
        while (days > 0) {
            let lastdate = new Date().setDate(date.getDate() - 1);
            let result = await UserModel.find({ addDate: { $lt: date, $gt: lastdate } })
            if (result) {
                let datestring = date.getDate();
                let d: any = {};
                d[datestring] = result.length
                data.push(d)
            }
            days -= 1
            date.setDate(date.getDate() - 1);
        }
        ctx.body = new Result()._data(data)._success(true);
    }
    @AuthVerify('admin')
    @Get(Base_Url + '/gps')
    public async getGpss(@Ctx ctx: Koa.BaseContext) {
        ctx.body = new Result()._success(true)._data((await UserModel.find({}, { gps: 1, _id: 0 })).filter(e => e.gps&&e.gps?.length>0).map(v=>v.gps));
    }
    @AuthVerify('admin')
    @Get(Base_Url + '/location')
    public async getUserGpsMap(@Ctx ctx: Koa.BaseContext) {
        const data = {}
        const result = await UserModel.find({}, { locations: 1, _id: 0 })
        result.forEach(e => {
            const arr = e.locations;
            arr?.forEach(v => {
                if (!data[v]) {
                    data[v] = 1;
                } else {
                    data[v]++;
                }
            })
        })
        ctx.body = new Result()._success(true)._data(data);
    }

}