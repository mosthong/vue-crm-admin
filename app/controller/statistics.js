'use strict';

const Controller = require('egg').Controller;

class SalesController extends Controller {
	// 首页
	async index() {
		const {
			ctx
		} = this;
		ctx.body = 'Eugene 客户管理系统';
	}

  /**
   * 订单统计
   * **************************************************************
   */
	// 按照部门统计销售情况
	async salesDepartment() {
		const ctx = this.ctx;
		const query = ctx.query;
		const result = await ctx.service.statistics.salesDepartment(query);
		
		ctx.body = result
	}


}

module.exports = SalesController;

