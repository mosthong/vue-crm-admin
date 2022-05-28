'use strict';

const Service = require('egg').Service;

class CsrftokenService extends Service {
  async token() {
    const ctx = this.ctx;
    ctx.body = {
      code: 200,
      csrfToken: ctx.csrf
    };
  }
}

module.exports = CsrftokenService;
