'use strict';

module.exports = () => {
  return async (ctx, next) => {
      const {socket, session} = ctx;
      // 获取客户端ID
      const clientId = socket.id;
      const query = socket.handshake.query;
      
      // 这里假设用户已登录，ctx.session中已保存了用户登录时颁布的token
      // 校验token
      if (session[query.uid].token !== query.token) { // 校验不通过
          // 踢出用户之前先发送消息
          socket.emit('res', '登录状态已改变，请重新登陆');
          // 调用adapter的remoteDisconnect方法远程控制client断开连接
          socket.adapter.remoteDisconnect(clientId, true, err => {
              console.log(`${ new Date() }\tKick { ${ clientId } } out.`);
          });
          return;
      }       
      await next();
  };    
}

