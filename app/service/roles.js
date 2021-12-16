'use strict';

const Service = require('egg').Service;

// 字符串转数字
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PermissionService extends Service {
  /**
   * 部门/权限管理
   * ******************************************************************
   */

  // 查询
  async find(param) {
    const ctx = this.ctx;
    const {
      Op
    } = this.app.Sequelize; // 引入where语法

    // 参数
    const query = {
      order: [
        ['id', 'ASC'],
      ]
    };

    //数据库查询
    const result = await ctx.model.Roles.findAll(query);

    // 树结构
    let treeArr = result.filter(ele => ele.parentId == 0).map(x => {
      let item = {
        id: x.id,
        parentId: x.parentId,
        roleId: x.roleId,
        roleName: x.roleName,
        permission: x.permission,
        comment: x.comment,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        children: []
      }
      item.children = result.filter(y => y.parentId == x.id);
      if(item.children.length > 0){ // 有二级产品
        item.children = item.children.map(z => {
          let z_item = {
            id: z.id,
            parentId: z.parentId,
            roleId: z.roleId,
            roleName: z.roleName,
            permission: z.permission,
            comment: z.comment,
            createdAt: z.createdAt,
            updatedAt: z.updatedAt,
            children: []
          }
          z_item.children = result.filter(w => w.parentId == z.id);
          if(z_item.children.length > 0){
            z_item.children = z_item.children.map(a => {
              let a_item = {
                id: a.id,
                parentId: a.parentId,
                roleId: a.roleId,
                roleName: a.roleName,
                permission: a.permission,
                comment: a.comment,
                createdAt: a.createdAt,
                updatedAt: a.updatedAt,
                children: []
              }
              a_item.children = result.filter(w => w.parentId == a.id);
              if(a_item.children.length == 0){
                a_item = a;
              }
              return a_item;
            })
          }else{
            z_item = z;
          }
          return z_item;
        });
      }else{
        item = x;
      }
      return item;
    });

    //返回数据
    return {
      code: 200,
      message: '查询成功',
      data: treeArr
    };
  }
}

module.exports = PermissionService;