'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  
  async login() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const userInfo = await ctx.service.user.find(data);
    // const aesEncrypt = await ctx.service.user.aesEncrypt('123456', 'key123'); //加密

    let result;
    if(userInfo.data){
      const aesDecrypt = await ctx.service.user.aesDecrypt(userInfo.data.password, 'key123');
      // console.log('查询用户信息', userInfo);
      //用户名密码生成token
      const creat_token = await ctx.service.user.aesEncrypt(userInfo.data.username + ',' + userInfo.data.password, 'key123');

      if(aesDecrypt === data.password){
        result = {
          code: 200,
          data: {
            csrf: ctx.csrf,
            token: creat_token
          },
          message: '登录成功'
        };
      }else{
        result = {
          code: 500,
          data: 'Wrong user name or password.',
          message: '用户名或密码错误'
        };
      }
    }else{
      result = {
        code: 500,
        data: null,
        message: '用户名不存在'
      };
    }

    ctx.body = result;
    
  }

  async info() {
    const ctx = this.ctx;

    const token = ctx.headers.token;
    const aesDecrypt = await ctx.service.user.aesDecrypt(token, 'key123');
    const userInfo = await ctx.service.user.find({
      username: aesDecrypt.split(',')[0],
      password: aesDecrypt.split(',')[1]
    });
    // console.log('解密token', userInfo);

    let result;
    if(userInfo.data){
      result = {
        code: 200,
        data: userInfo,
        message: '登录成功'
      };
    }else{
      result = {
        code: 500,
        data: null,
        message: '获取用户信息失败'
      };
    }

    ctx.body = result;
    
  }
}

module.exports = UsersController;
