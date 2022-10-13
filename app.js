/*
 * @Author: yuszhou
 * @Date: 2022-10-13 15:56:20
 * @LastEditTime: 2022-10-14 01:03:07
 * @LastEditors: yuszhou
 * @Description: 
 * @FilePath: \wechartNodeTc\app.js
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const wechart = require('./routes/wechart')
const indexRouter = require('./routes/index')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension:'ejs'
}))

//解决跨域和前端options请求问题
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
  const start = new Date()
  const ms = new Date() - start
})

// routes
app.use(wechart.routes())
// routes
app.use(indexRouter.routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
