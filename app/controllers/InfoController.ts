import { Controller, Ctx, Req, Body, Get, Post, Delete, Query, Flow, Params, Version } from 'amala';
import * as Koa from 'koa';
import { AuthVerify, UserVerify, AdminVerify, LoginVerify } from "../decorator/authentication";
import { Result } from "../models/result.model";
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { Record } from '../models/record.model';
const Base_Url = '/info'


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
@Controller('info')
export class InfoController {
    @Get('/day30')
    @Flow([LoginVerify,AdminVerify])
    public async getUserDay30Register(@Ctx() ctx: Koa.BaseContext) {
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
        return new Result()._data(data)._success(true);
    }

    @Get('/day30Open')
    // @Flow([LoginVerify,AdminVerify])
    public async getRecordDay30(@Ctx() ctx: Koa.BaseContext) {
        let days = 30;
        const data: any[] = [];
        const date = new Date();
        while (days > 0) {
            let result = await RecordModel.findOne({ addDate: formatDate(date) })
            if (result) {
                data.push(result)
            }
            days -= 1
            date.setDate(date.getDate() - 1);
        }
        return new Result()._data(data)._success(true);
    }
    @Get('/gps')
    @Flow([LoginVerify,AdminVerify])
    public async getGpss(@Ctx() ctx: Koa.BaseContext) {
        return new Result()._success(true)._data((await UserModel.find({}, { gps: 1, _id: 0 })).filter(e => e.gps&&e.gps?.length>0).map(v=>v.gps));
    }

    @Get('/location')
    @Flow([LoginVerify,AdminVerify])
    public async getUserGpsMap(@Ctx() ctx: Koa.BaseContext) {
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
        return new Result()._success(true)._data(data);
    }

}