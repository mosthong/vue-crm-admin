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
    // const { Op } = this.app.Sequelize;

    let dbUser = ctx.model.User;
    let dbRoles = ctx.model.Roles;

    let offset = toInt(param.pageNum) * toInt(param.pageSize) - toInt(param.pageSize);
    const query = {
      include: [{ model: dbRoles, as: 'systemRoles', attributes: ['roleName', 'permission', 'comment'] }],
      limit: toInt(param.pageSize),
      offset: offset,
      order: [
        ['created_at', 'DESC'],
      ],
      attributes:  { exclude: ['password'] }
    };

    const result = await dbUser.findAndCountAll(query);
    let new_arr = result.rows.map(x => {
      let item = {
        "id": x.id,
				"registerIp": x.registerIp,
				"username": x.username,
				"status": x.status,
				"createdAt": x.createdAt,
				"updatedAt": x.updatedAt,
				"roles": x.roles,
				"rolesArr": [],
        "roleDetail": x.systemRoles
      };
      // 组合权限 便于前端展示
      if (x.roles === 'admin') { // 超级管理员
        item.rolesArr = ['admin']
      }
      else if (x.roles.split('_').length === 1) { // 二级权限
        item.rolesArr = [...['admin'], x.roles]
      }
      else if (x.roles.split('_').length === 2) { // 三级权限
        item.rolesArr = [...['admin'], x.roles.split('_')[0], x.roles]
      }
      else { // 四级权限
        item.rolesArr = [...['admin'], x.roles.split('_')[0], x.roles.split('_')[0] + '_' + x.roles.split('_')[1], x.roles]
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

  /**
   * 查询全部用户列表
   */
  async getAllUser(param) {
    const ctx = this.ctx;

    let dbUser = ctx.model.User;

    const query = {
      attributes:  { exclude: ['password'] }
    };

    const result = await dbUser.findAll(query);
    return result;
  }

  /**
   * 查询我的下属列表
   */
  async getMyTeam(val) {
    const ctx = this.ctx;
    const { Op } = this.app.Sequelize;

    let dbUser = ctx.model.User;

    const query = {
      where: {
        roles: {
          [Op.like]: '%' + val + '%'
        }
      },
      attributes:  { exclude: ['password'] },
      include: [{ model: ctx.model.Roles, as: 'systemRoles' }]
    };

    const result = await dbUser.findAll(query);
    return result;
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
