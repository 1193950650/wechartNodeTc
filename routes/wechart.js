const router = require('koa-router')()
router.prefix('/wechart')

router.get('/',function(ctx,next){
    ctx.body = 'aaaaaa'
})

module.exports = router
