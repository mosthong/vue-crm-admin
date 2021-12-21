'use strict';

const Service = require('egg').Service;

// 字符串转数字
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class SalesService extends Service {
  /**
   * 订单管理
   * **************************************************************
  */
  // 查询 - 销售列表
  async find(param) {
    const ctx = this.ctx;
    const {
      Op
    } = this.app.Sequelize;

    let offset = toInt(param.pageNum) * toInt(param.pageSize) - toInt(param.pageSize);

    let User = ctx.model.User;
    // 从token中解析出username作为参数查询销售的数据
    const token = ctx.headers.token;
    const aesDecrypt = await ctx.service.user.aesDecrypt(token, 'key123');
    // 获取用户信息 - 查询权限
    const userInfo = await ctx.service.user.find({
      username: aesDecrypt.split(',')[0],
      password: aesDecrypt.split(',')[1]
    });
    
    // 找出权限内的成员
    let teamsData = [{
      sale_person: aesDecrypt.split(',')[0]
    }];

    if (param.salePerson) { // 如果传入销售员，精确查找
      teamsData = [{
        sale_person: param.salePerson
      }];
    }
    else if (userInfo.data.roles.indexOf('_leader') != -1) { // 主管查询团队所有成员
      // 截取lender之前的部分
      let roles = userInfo.data.roles.substring(0, userInfo.data.roles.indexOf('_leader'));
      const teams = await ctx.service.user.getMyTeam(roles);
      teamsData = teams.map(x => {
        return {
          salePerson: x.username
        };
      });
    }

    // 查询自己
    let query = {
      limit: toInt(param.pageSize),
      offset: offset,
      where: {
        [Op.or]: teamsData, // 团队成员
        createdAt: { // 时间段
          [Op.between]: [param.startTime, param.endTime]
        },
        isInvoice: { // 开票
          [Op.like]: '%' + param.isInvoice + '%'
        },
        productName: { // 产品
          [Op.like]: '%' + param.productName + '%'
        },
        saleDepartment: { // 部门
          [Op.like]: '%' + param.saleDepartment + '%'
        },
        payContactInfo: { // 联系方式
          [Op.like]: '%' + param.payContactInfo + '%'
        },
      },
      order: [
        ['created_at', 'DESC'],
      ],
      include: [{ model: User, as: 'userInfo', attributes: ['username', 'roles'] }]
    };

    const result = await ctx.model.Sales.findAndCountAll(query);
    
    return {
      code: 200,
      message: '查询成功',
      pageNum: param.pageNum,
      pageSize: param.pageSize,
      data: result,
    };
  }
  // 添加 - 销售记录
  async creat(data) {
    const ctx = this.ctx;

    const param = {
      productId: data.productId,
      productName: data.productName,
      customerName: data.customerName,
      customerCode: data.customerCode,
      transactionPrice: data.transactionPrice,
      transactionPriceForeign: data.transactionPriceForeign,
      transactionCount: data.transactionCount,
      salePerson: data.salePerson,
      salePersonId: data.salePersonId,
      saleDepartment: data.saleDepartment,
      isInvoice: data.isInvoice,
      payMethods: data.payMethods,
      payTime: data.payTime,
      payName: data.payName,
      payContactInfo: data.payContactInfo,
      country: data.country,
      remark: data.remark,
    };

    const result = await ctx.model.Sales.create(param);
    return {
      code: 200,
      message: '创建成功',
      data: result,
    };
  }
  // 批量添加 - 销售记录
  async batchAdd(data) {
    const ctx = this.ctx;

    const result = await ctx.model.Sales.bulkCreate(data);
    return {
      code: 200,
      message: '创建成功',
      data: result,
    };
  }
  // 修改 - 销售记录
  async update(data) {
    const ctx = this.ctx;

    const param = {
      productId: data.productId,
      productName: data.productName,
      customerName: data.customerName,
      customerCode: data.customerCode,
      transactionPrice: data.transactionPrice,
      transactionPriceForeign: data.transactionPriceForeign,
      transactionCount: data.transactionCount,
      salePerson: data.salePerson,
      salePersonId: data.salePersonId,
      saleDepartment: data.saleDepartment,
      isInvoice: data.isInvoice,
      payMethods: data.payMethods,
      payTime: data.payTime,
      payName: data.payName,
      payContactInfo: data.payContactInfo,
      country: data.country,
      remark: data.remark,
    };

    const result = await ctx.model.Sales.update(param, {
      where: {
        id: data.id
      }
    });

    if(result[0] == 1){
      return {
        code: 200,
        message: '修改成功',
        data: result,
      };
    }else{
      return {
        code: 500,
        message: '修改失败',
        data: result,
      };
    }
  }
  // 删除 - 销售记录
  async delete(data) {
    const ctx = this.ctx;

    const result = await ctx.model.Sales.destroy({
      where: {
        id: data.id
      }
    });
    return {
      code: 200,
      message: '删除成功',
      data: result,
    };
  }


  /**
   * 国家地区管理
   * ******************************************************************
   */

  // 查询 - 国家
  async country(param) {
    const ctx = this.ctx;

    const result = await ctx.model.Country.findAll();

    // 找出大洲
    // let country_arr = result.map(x => {
    //   let ele = {
    //     id: 'c' + x.id,
    //     continent: x.continent,
    //     country: '地区',
    //     country_list: []
    //   }
    //   return ele;
    // }).filter((item,index,self) => {
    //   return self.findIndex(el => el.continent == item.continent) === index
    // });
    

    // 找出子分类 国家
    // country_arr.forEach(x => {
    //   x.country_list = result.filter(y => y.continent == x.continent);
    // });

    return {
      code: 200,
      message: '查询成功',
      data: result
    };
  }
  // 添加 - 国家
  async creatCountry(data) {
    const ctx = this.ctx;

    const param = {
      continent: data.continent,
      country: data.country
    };

    const result = await ctx.model.Country.create(param);
    return {
      code: 200,
      message: '创建成功',
      data: result,
    };
  }
  // 修改 - 国家
  async updateCountry(data) {
    const ctx = this.ctx;

    const param = {
      id: data.id,
      continent: data.continent,
      country: data.country
    };

    const result = await ctx.model.Country.update(param, {
      where: {
        id: data.id
      }
    });

    if(result[0] == 1){
      return {
        code: 200,
        message: '修改成功',
        data: result,
      };
    }else{
      return {
        code: 500,
        message: '修改失败',
        data: result,
      };
    }
  }
  // 删除 - 国家
  async deleteCountry(data) {
    const ctx = this.ctx;

    const result = await ctx.model.Country.destroy({
      where: {
        id: data.id
      }
    });

    if(result == 1){
      return {
        code: 200,
        message: '删除成功',
        data: result,
      };
    }else{
      return {
        code: 500,
        message: '删除失败',
        data: result,
      };
    }
  }

  /**
   * 产品管理
   * ******************************************************************
   */

  /**
   * 查询 - 产品
   * @param {*} param 
   * @returns 
   */
  async product(param) {
    const ctx = this.ctx;
    const {
      Op
    } = this.app.Sequelize; // 引入where语法

    // 参数
    const query = {
      order: [
        ['sort', 'ASC'],
      ]
    };

    //数据库查询
    const result = await ctx.model.Product.findAll(query);

    let product_list = result.filter(ele => ele.parentId == 0).map(x => {
      let item = {
        id: x.id,
        parentId: x.parentId,
        categoryName: x.categoryName,
        sort: x.sort,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        children: []
      }
      item.children = result.filter(y => y.parentId == x.id);
      if(item.children.length > 0){ // 有二级产品
        item.children = item.children.map(z => {
          let z_item = {
            id: z.id,
            parentId: z.parentId,
            categoryName: z.categoryName,
            sort: z.sort,
            createdAt: z.createdAt,
            updatedAt: z.updatedAt,
            children: []
          }
          z_item.children = result.filter(w => w.parentId == z.id);
          if(z_item.children.length > 0){
            z_item.children = z_item.children.map(a => {
              let a_item = {
                id: a.id,
                parentId: a.parentId,
                categoryName: a.categoryName,
                sort: a.sort,
                createdAt: a.createdAt,
                updatedAt: a.updatedAt,
                children: []
              }
              a_item.children = result.filter(w => w.parentId == a.id);
              if(a_item.children.length == 0){
                a_item = a;
              }
              return a_item;
            })
          }else{
            z_item = z;
          }
          return z_item;
        });
      }else{
        item = x;
      }
      return item;
    });

    // 遍历找出关联




    //返回数据
    return {
      code: 200,
      message: '查询成功',
      data: product_list
    };
  }
  // 添加
  async creatProduct(data) {
    const ctx = this.ctx;

    const param = {
      parentId: data.parentId,
      categoryName: data.categoryName,
      sort: data.sort
    };

    const result = await ctx.model.Product.create(param);
    return {
      code: 200,
      message: '创建成功',
      data: result,
    };
  }
  // 修改
  async updateProduct(data) {
    const ctx = this.ctx;

    const param = {
      parentId: data.parentId,
      categoryName: data.categoryName,
      sort: data.sort
    };

    const result = await ctx.model.Product.update(param, {
      where: {
        id: data.id
      }
    });

    if(result[0] == 1){
      return {
        code: 200,
        message: '修改成功',
        data: result,
      };
    }else{
      return {
        code: 500,
        message: '修改失败',
        data: result,
      };
    }
  }
  // 删除
  async deleteProduct(data) {
    const ctx = this.ctx;

    const result = await ctx.model.Product.destroy({
      where: {
        id: data.id
      }
    });

    if(result == 1){
      return {
        code: 200,
        message: '删除成功',
        data: result,
      };
    }else{
      return {
        code: 500,
        message: '删除失败',
        data: result,
      };
    }
  }
}

module.exports = SalesService;