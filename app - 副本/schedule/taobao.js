const { formatTime } = require('../extend/helper')

module.exports = {
    // schedule: {
    //     interval: 250,
    //     type: 'all', // 指定所有的 worker 都需要执行
    // },
    // async task(ctx) {
    //     // 获取淘宝时间
    //     const result = await ctx.curl('http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp', {
    //         dataType: 'json',
    //         timeout: 3000,
    //     });

    //     let taobaoTime = formatTime(parseInt(result.data.data.t));
    //     console.log('淘宝时间：' + taobaoTime)
    //     ctx.app.taobaoTime = taobaoTime;
    // },
};