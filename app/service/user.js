'use strict';

const Service = require('egg').Service;

//使用node加密方法
const crypto = require('crypto');

// 字符串转数字
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserService extends Service {
  /**
   * createHmac加密数据
   */
  async aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  /**
   * 解密数据
   */
  async aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * 查询 - 用户信息
   * @param {*} param 
   * @returns 
   */
  async find(data) {
    const ctx = this.ctx;
    const { Op } = this.app.Sequelize

    const query = { 
      where: {
        username: data.username, 
      },
      attributes:  { exclude: ['password'] },
      include: [{ model: ctx.model.Roles, as: 'systemRoles'}]
    };

    const result = await ctx.model.User.findOne(query);
    return {
      data: result
    };
  }

  /**
   * 用户列表
   */
  async list(param) {
    const ctx = this.ctx;
    const {
      Op
    } = this.app.Sequelize;

    let offset = toInt(param.pageNum) * toInt(param.pageSize) - toInt(param.pageSize);

    const query = {
      limit: toInt(param.pageSize),
      offset: offset,
      order: [
        ['created_at', 'ASC'],
      ],
      attributes:  { exclude: ['password'] }
    };

    const result = await ctx.model.User.findAndCountAll(query);
    let new_arr = result.rows.map(x => {
      let item = {
        "id": x.id,
				"roles": x.roles,
				"roles_arr": [],
				"registerIp": x.registerIp,
				"username": x.username,
				"status": x.status,
				"createdAt": x.createdAt,
				"updatedAt": x.updatedAt,
      };
      if(x.roles === 'admin'){
        item.roles_arr = ['admin']
      }else{
        item.roles_arr = [...['admin'], x.roles.split('_')[0], x.roles]
      }
      return item;
    });
    
    return {
      code: 200,
      message: '查询成功',
      current: 1,
      data: {
        count: result.count,
        rows: new_arr
      }
    };
  }

  // 创建用户
  async creat(data) {
    const ctx = this.ctx;
    
    const passwordAesEncrypt = await ctx.service.user.aesEncrypt(data.password, 'key123'); //加密

    const param = {
      roles: data.roles,
      registerIp: ctx.ip,
      username: data.username,
      password: passwordAesEncrypt,
      status: data.status
    };

    const result = await ctx.model.User.create(param);
    return {
      code: 200,
      message: '创建成功',
      data: result,
    };
  }

  // 修改用户
  async update(data) {
    const ctx = this.ctx;

    let newPassword = undefined;
    if(data.password){ // 有密码
      newPassword = await ctx.service.user.aesEncrypt(data.password, 'key123'); //加密
    }

    const param = {
      roles: data.roles,
      registerIp: ctx.ip,
      username: data.username,
      password: newPassword,
      status: data.status
    };

    const result = await ctx.model.User.update(param,{
      where: {
        id: data.id
      }
    });
    return {
      code: 200,
      message: '修改成功',
      data: result,
    };
  }

  // 删除用户
  async delete(id) {
    const ctx = this.ctx;
    
    const result = await ctx.model.User.destroy({
      where: {
        id: id
      }
    });
    return {
      code: 200,
      message: '删除成功',
      data: result,
    };
  }

}

module.exports = UserService;
