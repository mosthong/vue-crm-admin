exports.mysql = {
  /**
   * 单数据库信息配置 mysql默认设置 如果sequelize单独设置并使用sequelize语法，则此处失效
   */
  client: {
    // host
    host: '129.204.122.42',
    // 端口号
    port: '3306',
    // 用户名
    user: 'jp_crm',
    // 密码
    password: 'cTk8MFxHGT57ScnF',
    // 数据库名
    database: 'jp_crm',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};