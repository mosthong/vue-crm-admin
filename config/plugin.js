'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // },
  // validate 
  // validate: {
  //   enable: true,
  //   package: 'egg-validate',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  //配置跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
