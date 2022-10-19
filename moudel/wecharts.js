/*
 * @Author: yuszhou
 * @Date: 2022-10-13 23:00:59
 * @LastEditTime: 2022-10-17 11:10:14
 * @LastEditors: yuszhou
 * @Description: 实现wecharts 方法
 * @FilePath: \wechartNodeTc\moudel\wecharts.js
 */
const axios = require('flyio')
class wechart {
    constructor() {
        //当前openId为测试版 //如果存在真实openId则需要替换
        this.appId = 'wxf9773b51ec6dc1e8'
        this.secret = '5295febe0177ae35d1570ed7e25024d0'
    }
    
    async getwechartsOpenIdByCode(code) {
        try {
            return new Promise((r)=>{
                axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.appId}&secret=${this.secret}&code=${code}&grant_type=authorization_code`).then(res=>{
                    r(JSON.parse(res.response.body))  
                })
            })
        } catch (error) {
            console.log('[getwechartsOpenIdByCode serviceError]' + error)
            return null
        }
    }

    async getuserInfoByTokenAndOpenId(access_token,openid){
        try {
            return new Promise((r)=>{
                axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`).then(res=>{
                    r(JSON.parse(res.response.body))  
                })
            })
        } catch (error) {
            console.log('[getuserInfoByTokenAndOpenId serviceError]' + error)
            return null
        }
    }
    async getaccessToken(){
        try {
            return new Promise((r)=>{
                axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.secret}`).then(res=>{
                    r(JSON.parse(res.response.body))  
                })
            })
        } catch (error) {
            console.log('[getuserInfoByTokenAndOpenId serviceError]' + error)
            return null
        }
    }
    //getMenu
    async getMenu(token){
        try {
            return new Promise((r)=>{
                axios.get(`https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=${token}`).then(res=>{
                    r(JSON.parse(res.response.body))  
                })
            })
        } catch (error) {
            console.log('[getMenu serviceError]' + error)
        }
    }
    //setMenu
    async setMenu(data,token){
        try {
            return new Promise((r)=>{
                console.log(data)
                axios.post(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`,data).then(res=>{
                    r(JSON.parse(res.response.body))  
                }).catch(errr=>{
                    console.log(errr)
                })
            })
        } catch (error) {
            console.log('[setMenu serviceError]' + error)
        }
    }
    
}

module.exports = wechart