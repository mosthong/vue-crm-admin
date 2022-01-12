'use strict';

const Service = require('egg').Service;

// 字符串转数字
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
// 上周时间
function getLastWeek(value = null, separate = '-'){
  // 如果为null,则格式化当前时间
  if (!value) value = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  const one_day = 86400000; // 24 * 60 * 60 * 1000;
  const lastWeekDate = new Date(value - 7 * one_day);
  const day = lastWeekDate.getDay() === 0 ? 7 : lastWeekDate.getDay(); // 返回1-7,7表示周日
  // 设置时间为上周那天的0点
  lastWeekDate.setHours(0, 0, 0, 0);

  //算出上周开始时间结束时间
  const week_start_time = new Date(lastWeekDate.getTime() - (day - 1) * one_day);
  const week_end_time = new Date(lastWeekDate.getTime() + (7 - day) * one_day);

  //格式化日期
  const filters = n => {
    return n < 10 ? (n = '0' + n) : n;
  };
  const startmonth = filters(week_start_time.getMonth() + 1);
  const startDay = filters(week_start_time.getDate());
  const endmonth = filters(week_end_time.getMonth() + 1);
  const endDay = filters(week_end_time.getDate());

  const startDateTime = week_start_time.getFullYear() + separate + startmonth + separate + startDay;
  const endDateTime = week_end_time.getFullYear() + separate + endmonth + separate + endDay;

  return {
    startDateTime: startDateTime + ' 00:00:00',
    endDateTime: endDateTime + ' 23:59:59',
  };
};
// 本周时间
const getCurrentWeek = (value = null, separate = '-') => {
  // 如果为null,则格式化当前时间
  if (!value) value = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  const one_day = 86400000; // 24 * 60 * 60 * 1000;
  const weekDate = new Date(value);
  const day = weekDate.getDay() === 0 ? 7 : weekDate.getDay(); // 返回1-7,7表示周日
  // 设置时间为当天的0点
  weekDate.setHours(0, 0, 0, 0);

  //算出本周开始时间结束时间
  const week_start_time = new Date(weekDate.getTime() - (day - 1) * one_day);
  const week_end_time = new Date(weekDate.getTime() + (7 - day) * one_day);

  //格式化日期
  const filters = n => {
    return n < 10 ? (n = '0' + n) : n;
  };
  const startmonth = filters(week_start_time.getMonth() + 1);
  const startDay = filters(week_start_time.getDate());
  const endmonth = filters(week_end_time.getMonth() + 1);
  const endDay = filters(week_end_time.getDate());

  const startDateTime = week_start_time.getFullYear() + separate + startmonth + separate + startDay;
  const endDateTime = week_end_time.getFullYear() + separate + endmonth + separate + endDay;
  return {
    startDateTime: startDateTime + ' 00:00:00',
    endDateTime: endDateTime + ' 23:59:59',
  };
};
// 上月
const getLastMonth = (value = null, separate = '-') => {
  // 如果为null,则格式化当前时间
  if (!value) value = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  // 获取上个月时间
  const targetTime = new Date(value);
  let year = targetTime.getFullYear();
  let month = targetTime.getMonth();
  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const yDate = new Date(year, month, 0);

  const startDateTime = year + separate + month + separate + '01 00:00:00'; //上个月第一天
  const endDateTime = year + separate + month + separate + yDate.getDate() + ' 23:59:59'; //上个月最后一天
  return {
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
};

// 本周/本月/本季度/本年 时间
function timeSlotChange (val) {
  let now = new Date(); //当前日期
  let nowDayOfWeek = now.getDay(); //今天本周的第几天
  let nowDay = now.getDate(); //当前日
  let nowMonth = now.getMonth() + 1; //当前月
  let nowYear = now.getFullYear(); //当前年
  let quarter = Math.ceil((nowMonth) / 3) // 位于第几季度 当前月份/3

  let sMonth,sDay,sHours,sMinute,sSecond;
  let eMonth,eDay,eHours,eMinute,eSecond;
  switch (val) {
    case "本周":
      sMonth = nowMonth;
      sDay = nowDay - nowDayOfWeek + 1;
      sHours = '00';
      sMinute = '00';
      sSecond = '00';

      eMonth = nowMonth;
      eDay = nowDay + (7 - nowDayOfWeek);
      eHours = '23';
      eMinute = '59';
      eSecond = '59';
      break;
    case "本月":
      sMonth = nowMonth;
      sDay = 1;
      sHours = '00';
      sMinute = '00';
      sSecond = '00';

      eMonth = nowMonth;
      eDay = new Date(nowYear, nowMonth + 1, 0).getDate();
      eHours = '23';
      eMinute = '59';
      eSecond = '59';
      break;
    case "本季度":
      sMonth = new Date(nowYear, (quarter - 1) * 3, 1).getMonth();
      sDay = 1;
      sHours = '00';
      sMinute = '00';
      sSecond = '00';

      let jeMonth = new Date(nowYear, quarter * 3, 0);
      eMonth = jeMonth.getMonth() + 1;
      eDay = jeMonth.getDate();
      eHours = '23';
      eMinute = '59';
      eSecond = '59';
      break
    case "本年":
      sMonth = 1;
      sDay = 1;
      sHours = '00';
      sMinute = '00';
      sSecond = '00';

      eMonth = '12';
      eDay = new Date(nowYear, 12, 0).getDate();
      eHours = '23';
      eMinute = '59';
      eSecond = '59';
      break
  }

  sMonth = sMonth < 10 ? '0' + sMonth : sMonth;
  sDay = sDay < 10 ? '0' + sDay : sDay;
  eMonth = eMonth < 10 ? '0' + eMonth : eMonth;
  eDay = eDay < 10 ? '0' + eDay : eDay;

  return {
    startTime: nowYear + '-' + sMonth + '-' +  sDay + ' ' + sHours + ':' + sMinute + ':' + sSecond,
    endTime: nowYear + '-' + eMonth + '-' +  eDay + ' ' + eHours + ':' + eMinute + ':' + eSecond
  };
};





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

  // 查询 - 产品销售情况
  async salesForProducts(param) {
    const ctx = this.ctx;
    const {
      Op
    } = this.app.Sequelize;

    // 找出父级
    let products = await ctx.model.Product.findAll({
      where: {
        parentId: 0
      }
    });

    // 查询销售记录
    let sales = await ctx.model.Sales.findAll({
      where: {
        createdAt: { // 时间段
          [Op.between]: [param.startTime, param.endTime]
        },
      }
    });

    let salesProducts = [];
    let salesNum = [];
    let salesTotal = [];
    let result = await products.map(x => {
      let item = {
        "id": x.id,
        "parentId": x.parentId,
        "categoryName": x.categoryName,
        "sort": x.sort,
        "createdAt": x.createdAt,
        "updatedAt": x.updatedAt,
        "salesNum": 0,
        "salesData": [],
      };
      item.salesData = sales.filter( y => y.productName.indexOf(x.categoryName) != -1 );
      item.salesNum = item.salesData.length;

      salesProducts.push(x.categoryName);
      salesNum.push(item.salesData.length);

      let i_total = 0;
      item.salesData.map(j => {
        i_total += parseInt(j.transactionPrice);
      });
      salesTotal.push(i_total);

      return item;
    })

    return {
      code: 200,
      message: '查询成功',
      data: {
        salesNum: {
          xAxis: salesProducts,
          data: salesNum
        },
        salesTotal: {
          xAxis: salesProducts,
          data: salesTotal
        }
      },
      list: result
    };
  }

  // 查询 - 上周、本月、本季、本年 订单数量
  async salesForTimeSlot(params){
    const ctx = this.ctx;
    const {
      Op
    } = this.app.Sequelize;
    
    // 上周
    let lastWeek = getLastWeek()
    let lastWeekQuery = {
      limit: 0,
      offset: 0,
      where: {},
      order: [
        ['created_at', 'DESC'],
      ]
    };
    lastWeekQuery.where = {
      createdAt: { // 时间段
        [Op.between]: [lastWeek.startDateTime, lastWeek.endDateTime]
      }
    };
    // 本周
    let currentWeekQuery = {
      limit: 0,
      offset: 0,
      where: {},
      order: [
        ['created_at', 'DESC'],
      ]
    };
    let currentWeek = getCurrentWeek()
    currentWeekQuery.where = {
      createdAt: { // 时间段
        [Op.between]: [currentWeek.startDateTime, currentWeek.endDateTime]
      }
    };
    // 上月
    let lastMonthQuery = {
      limit: 0,
      offset: 0,
      where: {},
      order: [
        ['created_at', 'DESC'],
      ]
    };
    let lastMonth = getLastMonth()
    lastMonthQuery.where = {
      createdAt: { // 时间段
        [Op.between]: [lastMonth.startDateTime, lastMonth.endDateTime]
      }
    };
    // 本季度
    let currentQuarterQuery = {
      limit: 0,
      offset: 0,
      where: {},
      order: [
        ['created_at', 'DESC'],
      ]
    };
    let currentQuarter = timeSlotChange('本季度')
    currentQuarterQuery.where = {
      createdAt: { // 时间段
        [Op.between]: [currentQuarter.startTime, currentQuarter.endTime]
      }
    };
    // 本年
    let currentYearQuery = {
      limit: 0,
      offset: 0,
      where: {},
      order: [
        ['created_at', 'DESC'],
      ]
    };
    let currentYear = timeSlotChange('本年')
    currentYearQuery.where = {
      createdAt: { // 时间段
        [Op.between]: [currentQuarter.startTime, currentQuarter.endTime]
      }
    };
    // 本月
    let currentMonthQuery = {
      limit: 0,
      offset: 0,
      where: {},
      order: [
        ['created_at', 'DESC'],
      ]
    };
    let currentMonth = timeSlotChange('本月')
    currentMonthQuery.where = {
      createdAt: { // 时间段
        [Op.between]: [currentMonth.startTime, currentMonth.endTime]
      }
    };

    const lastWeekResult = await ctx.model.Sales.findAndCountAll(lastWeekQuery);
    const currentWeekResult = await ctx.model.Sales.findAndCountAll(currentWeekQuery);
    const lastMonthResult = await ctx.model.Sales.findAndCountAll(lastMonthQuery);
    const currentQuarterResult = await ctx.model.Sales.findAndCountAll(currentQuarterQuery);
    const currentYearResult = await ctx.model.Sales.findAndCountAll(currentYearQuery);
    const currentMonthResult = await ctx.model.Sales.findAndCountAll(currentMonthQuery);
    const saleList = await ctx.model.Sales.findAndCountAll({
      limit: 10,
      offset: 0,
      where: {},
      order: [
        ['created_at', 'DESC'],
      ]
    });
    
    return {
      code: 200,
      message: '查询成功',
      data: {
        lastWeek: {
          title: '上周销量',
          date: lastWeek,
          count: lastWeekResult.count,
          rows: lastWeekResult.rows
        },
        currentWeek: {
          title: '本周销量',
          date: currentWeek,
          count: currentWeekResult.count,
          rows: currentWeekResult.rows
        },
        lastMonth: {
          title: '上月销量',
          date: lastMonth,
          count: lastMonthResult.count,
          rows: lastMonthResult.rows
        },
        currentQuarter: {
          title: '本季度销量',
          date: currentQuarter,
          count: currentQuarterResult.count,
          rows: currentQuarterResult.rows
        },
        currentYear: {
          title: '本年销量',
          date: currentYear,
          count: currentYearResult.count,
          rows: currentYearResult.rows
        },
        currentMonth: {
          title: '本月销量',
          date: currentMonth,
          count: currentMonthResult.count,
          rows: currentMonthResult.rows
        },
        saleList
      }
    };
  }
}

module.exports = StatisticsService;