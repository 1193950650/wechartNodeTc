/*
 * @Author: yuszhou
 * @Date: 2022-10-13 15:56:20
 * @LastEditTime: 2022-10-13 23:47:04
 * @LastEditors: yuszhou
 * @Description: 
 * @FilePath: \wechartNodeTc\routes\index.js
 */
const router = require('koa-router')()
const wechart = require('../moudel/wecharts')

router.get('/', async (ctx, next) => {
  return await ctx.render('index',{body:JSON.stringify(new wechart('1',2))})
})

module.exports = router
