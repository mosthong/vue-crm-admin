'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DATETIME, NOW } = app.Sequelize;

  const Product = app.model.define(
    'jp_crm_sale_product', 
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      parentId: {
        type: INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      categoryName: {
        type: STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      sort: INTEGER,
    }
  );

  return Product;
};