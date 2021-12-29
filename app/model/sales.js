'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DATETIME, NOW } = app.Sequelize;

  const Sales = app.model.define(
    'jp_crm_sale_list', 
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      productName: {
        type: STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      productId: {
        type: STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      customerName: {
        type: STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      customerCode: {
        type: STRING(50)
      },
      transactionPrice: INTEGER,
      transactionPriceForeign: INTEGER,
      transactionCount: INTEGER,
      salePerson: {
        type: STRING(30),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      salePersonId: {
        type: INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      saleDepartment: STRING(50),
      isInvoice: INTEGER,
      payMethods: INTEGER,
      payTime: DATE,
      payName: STRING(100),
      payContactInfo: STRING(20),
      country: STRING(50),
      remark: STRING(200),
    }
  );

  return Sales;
};