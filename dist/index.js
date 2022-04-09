"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koa_controllers_1 = require("koa-controllers");
const app = new Koa();
(0, koa_controllers_1.useControllers)(app, __dirname + '/controllers/*.ts', {
    multipart: {
        dest: './uploads'
    }
});
app.listen(8080);
