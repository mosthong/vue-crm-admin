'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DATETIME, NOW } = app.Sequelize;

  const Roles = app.model.define(
    'jp_system_roles', 
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      parentId: INTEGER,
      roleId: {
        type: STRING(30),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      roleName: {
        type: STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      permission: STRING(50),
      comment: STRING(100)
    }
  );

  return Roles;
};