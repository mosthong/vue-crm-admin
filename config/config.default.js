/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1637661880884_1603';

  // add your middleware config here
  config.middleware = [];

  // 数据库ORM 框架
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'jp_crm',
    username: 'root',
    password: '111111',
    define: {
      raw: true,
      underscored: true,
      freezeTableName: true, //直接查找设置的表名，默认是表名加s或者es
      timestamps: true,   
    },
    //保存时用的时间
    timezone: '+08:00' ,// 保存为本地时区
    //读取时用的时间
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  }

  // 请求头安全验证
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };
  
  config.cors = {
    credentials: true, // 支持cookie跨域
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
