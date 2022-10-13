/*
 * @Author: yuszhou
 * @Date: 2022-10-13 15:56:20
 * @LastEditTime: 2022-10-14 01:44:11
 * @LastEditors: yuszhou
 * @Description: *remarks:微信token验证。
 * 此验证为get 微信将发送一个含有微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
 * timestamp（时间戳）
 * nonce（随机数）
 * echostr（将要返回给微信的参数，如果加密后的数据相等）
 * @FilePath: \wechartNodeTc\routes\wechart.js
 */
const router = require('koa-router')()
const sha1 = require('sha1')
const wecharts = require('../moudel/wecharts')
const wechartService = new wecharts()
router.prefix('/wechart')
router.get('/authertoken',function (ctx,next) {
    const token = 'wechartToken'
    const query = ctx.query
    const signature = query.signature || ''
    const timestamp = query.timestamp || ''
    const nonce = query.nonce || ''
    const echostr = query.echostr || ''
    let str = [token, timestamp, nonce].sort().join('')
    let sha1code = sha1(str)
    if(sha1code == signature){
        ctx.body = echostr
    }else{
        ctx.body = ''
    }

})

//获取微信信息
router.get('/getwechartsUserInfo',async(ctx,next)=>{
    const autherCode = ctx.request.url.split('code=')[1].split('&')[0]
    const {access_token,openid} = await wechartService.getwechartsOpenIdByCode(autherCode)
    const {nickname,sex,province,city,country,headimgurl,privilege,unionid} = await wechartService.getuserInfoByTokenAndOpenId(access_token,openid)
    const redirectUrl = await 
})
module.exports = router
