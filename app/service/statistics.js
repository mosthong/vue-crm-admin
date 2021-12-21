'use strict';

const Service = require('egg').Service;

// 字符串转数字
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class StatisticsService extends Service {
  /**
   * 订单统计
   * **************************************************************
  */
  // 查询 - 销售员销售情况
  async salesDepartment(param) {
    const ctx = this.ctx;
    const {
      Op
    } = this.app.Sequelize;

    // 查询用户
    let user = await ctx.model.User.findAll({
      where: {
        roles: {
          [Op.like]: '%' + param.roles + '%'
        },
        '$saleList.created_at$': { [Op.between]: [param.startTime, param.endTime] }
      },
      attributes:  { exclude: ['password'] },
      include: [{ model: ctx.model.Sales, as: 'saleList' }]
    });
    let salesVolume = [];
    let salesPrice = [];
    // 销售员
    let staff = user.map(x => {
      let transactionCount = 0; // 销量
      let x_saleTotal = 0; // 销售额
      x.saleList.map(y => {
        y.transactionCount ? transactionCount += y.transactionCount : transactionCount += 1;
        x_saleTotal = (x_saleTotal * 100 + parseFloat(y.transactionPrice) * 100) / 100;
      });
      salesVolume.push(transactionCount);
      salesPrice.push(x_saleTotal.toFixed(2));
      return x.username;
    })

    return {
      code: 200,
      message: '查询成功',
      data: {
        salesVolume: {
          xAxis: staff,
          data: salesVolume
        },
        salesPrice: {
          xAxis: staff,
          data: salesPrice
        },
        sales: user
      }
    };
  }
}

module.exports = StatisticsService;