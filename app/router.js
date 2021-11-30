'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.sales.index); // 首页

  /**
   * 登录
   */
  // 获取csrf token
  router.get('/csrfToken', controller.csrftoken.token); 
  // 后台登录
  router.post('/back/users/login', controller.user.login); 
  //获取用户信息
  router.get('/back/users/info', controller.user.info); 

  /**
   * 销售记录管理
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
   * 国家地区管理
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
   */
  // 查询 - 产品分类
  router.get('/back/sales/product', controller.sales.getProduct); 
  // 添加
  router.post('/back/sales/product/creat', controller.sales.creatProduct); 
  // 修改
  router.post('/back/sales/product/update', controller.sales.updateProduct); 
  // 删除
  router.post('/back/sales/product/delete', controller.sales.deleteProduct); 


};
