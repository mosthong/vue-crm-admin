'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DATETIME, NOW } = app.Sequelize;

  const User = app.model.define(
    'jp_system_users', 
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      roles: STRING(30),
      registerIp: STRING(100),
      username: {
        type: STRING(30),
      },
      password: STRING(200),
      status: INTEGER
    }
  );
  
  /**
   * 建立表关联
   */
  User.associate = function() {
    app.model.User.belongsTo(app.model.Roles, { as: 'systemRoles', foreignKey: 'roles', targetKey: 'roleId'});
    app.model.User.hasMany(app.model.Sales, { as: 'saleList', foreignKey: 'salePerson', sourceKey: 'username'});
    app.model.Sales.belongsTo(app.model.User, { as: 'userInfo', targetKey: 'username', foreignKey: 'salePerson'});
  };

  return User;
};