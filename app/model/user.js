'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DATETIME, NOW } = app.Sequelize;

  const User = app.model.define(
    'jp_admin_users', 
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      password: STRING(200),
      roles: STRING(20),
      role_name: STRING(30)
    }
  );

  return User;
};