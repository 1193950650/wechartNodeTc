const router = require('koa-router')()
router.prefix('/wechart')

router.post('/',function(ctx,next){
    let sendParmars = {}
    try {
        sendParmars = {
            title:'wechart',
            value:'this is wechart body'
        }
    }catch (e) {
        sendParmars = {title:'',value: ''}
    }
    ctx.body = sendParmars
})

module.exports = router
