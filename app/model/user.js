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
  };

  return User;
};