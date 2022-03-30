'use strict';

const Controller = require('egg').Controller;

class SalesController extends Controller {
    // 首页
    async index() {
        const {
            ctx
        } = this;

        ctx.body = `<h1>淘宝时间：</h1><br><p>${ctx.app.taobaoTime}</p>`;
    }
}

module.exports = SalesController;