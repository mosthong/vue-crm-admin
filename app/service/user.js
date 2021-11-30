'use strict';

const Service = require('egg').Service;

//使用node加密方法
const crypto = require('crypto');

class UserService extends Service {
  /**
   * 查询 - 用户信息
   * @param {*} param 
   * @returns 
   */
  async find(data) {
    const ctx = this.ctx;
    // const { Op } = this.app.Sequelize

    const query = { 
      where: {
        username: data.username, 
      }
    };

    const result = await ctx.model.User.findOne(query);
    return {
      data: result
    };
  }

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

}

module.exports = UserService;
