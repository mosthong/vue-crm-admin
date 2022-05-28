'use strict';

const Controller = require('egg').Controller;

class PermissionController extends Controller {
    /**
     * 部门管理
     * **************************************************************
     */
    // 列表
    async list() {
        const ctx = this.ctx;
        const query = ctx.query;
        const result = await ctx.service.roles.find(query);

        ctx.body = result
    }
}

module.exports = PermissionController;