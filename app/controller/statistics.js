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
	// 按照销售人员统计销售情况
	async salesDepartment() {
		const ctx = this.ctx;
		const query = ctx.query;
		const result = await ctx.service.statistics.salesDepartment(query);
		
		ctx.body = result
	}

	// 根据一级产品统计
	async salesForProducts() {
		const ctx = this.ctx;
		const query = ctx.query;
		const result = await ctx.service.statistics.salesForProducts(query);
		
		ctx.body = result
	}

	// 上周、本月、本季、本年 订单数量统计
	async salesForTimeSlot(){
		const ctx = this.ctx;
		const query = ctx.query;
		const result = await ctx.service.statistics.salesForTimeSlot(query);
		
		ctx.body = result
	}


}

module.exports = SalesController;

