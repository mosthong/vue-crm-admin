'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;

  router.get('/', controller.sales.index); // 首页

  /**
   * 授权登录
   * ********************************************************************
   */
  // 获取csrf token
  router.get('/csrfToken', controller.csrftoken.token);
  // 后台登录
  router.post('/back/users/login', controller.user.login);
  //获取用户信息
  router.get('/back/users/info', controller.user.info);
  //获取用户列表
  router.get('/back/users/list', controller.user.list);
  // 创建用户
  router.post('/back/users/creat', controller.user.creat);
  // 修改用户
  router.post('/back/users/update', controller.user.update);
  // 删除用户
  router.delete('/back/users/delete/:id', controller.user.delete);

  /**
   * 销售记录管理
   * ********************************************************************
   **/
  // 查询 - 销售列表
  router.get('/back/sales/list', controller.sales.list);
  // 添加 - 销售记录
  router.post('/back/sales/creat', controller.sales.creat);
  // 批量添加 - 销售记录
  router.post('/back/sales/batchAdd', controller.sales.batchAdd);
  // 修改 - 销售记录
  router.post('/back/sales/update', controller.sales.update);
  // 删除 - 销售记录
  router.post('/back/sales/delete', controller.sales.delete);

  /**
   * 销售数据统计
   * ********************************************************************
   **/
  // 按照部门统计销售情况
  router.get('/back/statistics/sales/department', controller.statistics.salesDepartment);


  /**
   * 国家地区管理
   * ********************************************************************
   **/
  // 查询 - 国家地区
  router.get('/back/sales/country', controller.sales.getCountry);
  // 添加
  router.post('/back/sales/country/creat', controller.sales.creatCountry);
  // 修改
  router.post('/back/sales/country/update', controller.sales.updateCountry);
  // 删除
  router.post('/back/sales/country/delete', controller.sales.deleteCountry);

  /**
   * 产品管理
   * ********************************************************************
   */
  // 查询 - 产品分类
  router.get('/back/sales/product', controller.sales.getProduct);
  // 添加
  router.post('/back/sales/product/creat', controller.sales.creatProduct);
  // 修改
  router.post('/back/sales/product/update', controller.sales.updateProduct);
  // 删除
  router.post('/back/sales/product/delete', controller.sales.deleteProduct);

  /**
   * 部门管理
   * ********************************************************************
   */
  // 查询
  router.get('/back/permission/roles/list', controller.roles.list);
  // 添加


};