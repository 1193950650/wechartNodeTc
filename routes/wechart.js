const router = require('koa-router')()
const sha1 = require('sha1')
router.prefix('/wechart')
/***********************
*times:28/07/2019
*author:1193950650@qq.com
*remarks:微信token验证。
 * 此验证为get 微信将发送一个含有微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
 * timestamp（时间戳）
 * nonce（随机数）
 * echostr（将要返回给微信的参数，如果加密后的数据相等）
************************/
router.get('/authertoken',function (ctx,next) {
    const token = 'wechart'
    const query = ctx.query
    const signature = query.signature || ''
    console.log("微信传递的加密："+signature)
    const timestamp = query.timestamp || ''
    const nonce = query.nonce || ''
    const echostr = query.echostr || ''
    let str = [token, timestamp, nonce].sort().join('')
    let sha1code = sha1(str)
    console.log('服务器加密：'+sha1code)
    if(sha1code == signature){
        ctx.body = echostr
    }else{
        ctx.body = ''
    }

})

router.get('/')

module.exports = router
