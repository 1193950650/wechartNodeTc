/*
 * @Author: yuszhou
 * @Date: 2022-10-13 15:56:20
 * @LastEditTime: 2022-10-17 02:01:35
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
const UimService = require('../moudel/getRedireactUrl')
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
    try {
        const autherCode = ctx.request.url.split('code=')[1]
        const {access_token,openid} = await wechartService.getwechartsOpenIdByCode(autherCode)
        const {nickname,sex,province,city,country,headimgurl,privilege,unionid} = await wechartService.getuserInfoByTokenAndOpenId(access_token,openid)
        const redirectUrl = await UimService({openId:openid,nickName:nickname,sex:sex,province:province,city:city,country:country,headimgUrl:headimgurl,privilege:privilege,unionId:unionid})  
        if(redirectUrl){
            ctx.status = 301
            ctx.redirect(redirectUrl)
        }else{
            await ctx.render('error')
            ctx.app.emit('error','登陆失败，请稍后再试')
        }
    } catch (error) {
        await ctx.render('error')
        ctx.app.emit('error',error)
    }    
})
router.get('/getMenu',async(ctx,next)=>{
    try {
        const {access_token} = await wechartService.getaccessToken()
        const menuList = await wechartService.getMenu(access_token)
        return ctx.render('menu',{data:JSON.stringify(menuList)})
    } catch (error) {
        await ctx.render('error')
        ctx.app.emit('error',error)     
    }
})
router.post('/setMenu',async(ctx,next)=>{
    try {
        const {access_token} = await wechartService.getaccessToken()
        const updateMenu = await wechartService.setMenu(ctx.request.body.data,access_token)
        ctx.body = updateMenu
    } catch (error) {
        await ctx.render('error')
        ctx.app.emit('error',error)     
    }
})
module.exports = router
