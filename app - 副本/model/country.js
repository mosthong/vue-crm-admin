'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DATETIME, NOW } = app.Sequelize;

  const Country = app.model.define(
    'jp_crm_country', 
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      continent: {
        type: STRING(50)
      },
      country: {
        type: STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
    }
  );

  return Country;
};