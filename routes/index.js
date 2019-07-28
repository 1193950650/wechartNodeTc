const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'welcome wechart api'
  })
})

module.exports = router
