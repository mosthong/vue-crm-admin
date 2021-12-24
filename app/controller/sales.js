'use strict';

const Controller = require('egg').Controller;

class SalesController extends Controller {
	// 首页 socket测试
	async index() {
		const { ctx } = this;

    const message = 'ctx.args[0]';
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);

		ctx.body = {
      title: 'Eugene 客户管理系统',
      data: message
    };
	}

  /**
   * 订单管理
   * **************************************************************
   */
	// 订单列表
	async list() {
		const ctx = this.ctx;
		const query = ctx.query;
		const result = await ctx.service.sales.find(query);
		
		ctx.body = result
	}
  // 添加 - 销售记录
  async creat() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.creat(data);
		
		ctx.body = result
  }
  // 批量添加 - 销售记录
  async batchAdd() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.batchAdd(data);
		
		ctx.body = result
  }
  // 修改 - 销售记录
  async update() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.update(data);
		
		ctx.body = result
  }
  // 删除 - 销售记录
  async delete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.delete(data);
		
		ctx.body = result
  }

  /**
   * 国家地区管理
   * ******************************************************************
   */
	// 国家地区
	async getCountry() {
		const ctx = this.ctx;
		const query = ctx.query;
		const result = await ctx.service.sales.country(query);

		ctx.body = result;
	}
  // 添加
  async creatCountry(){
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.creatCountry(data);

		ctx.body = result;
  }
  // 修改
  async updateCountry() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.updateCountry(data);
		
		ctx.body = result
  }
  // 删除
  async deleteCountry() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.deleteCountry(data);
		
		ctx.body = result
  }

  /**
   * 产品管理
   * ******************************************************************
   */

	// 产品分类
	async getProduct() {
		const ctx = this.ctx;
		const query = ctx.query;
		const result = await ctx.service.sales.product(query);

		ctx.body = result
	}
  // 添加
  async creatProduct(){
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.creatProduct(data);

		ctx.body = result;
  }
  // 修改
  async updateProduct() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.updateProduct(data);
		
		ctx.body = result
  }
  // 删除
  async deleteProduct() {
    const ctx = this.ctx;
    const data = ctx.request.body;
		const result = await ctx.service.sales.deleteProduct(data);
		
		ctx.body = result
  }

}

module.exports = SalesController;

