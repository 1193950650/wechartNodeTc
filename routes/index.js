/*
 * @Author: yuszhou
 * @Date: 2022-10-13 15:56:20
 * @LastEditTime: 2022-10-14 01:39:48
 * @LastEditors: yuszhou
 * @Description: 
 * @FilePath: \wechartNodeTc\routes\index.js
 */
const router = require('koa-router')()
const wechart = require('../moudel/wecharts')

router.get('/', async (ctx, next) => {
  return await ctx.render('index')
})

module.exports = router
