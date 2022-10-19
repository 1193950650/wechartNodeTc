/*
 * @Author: yuszhou
 * @Date: 2022-10-16 22:14:48
 * @LastEditTime: 2022-10-17 11:27:37
 * @LastEditors: yuszhou
 * @Description: 单点登录交互
 * @FilePath: \wechartNodeTc\moudel\getRedireactUrl.js
 */
const axios = require('flyio')
const getRedireactUrl = function ({openId,nickName,sex,province,city,country,headimgUrl,privilege,unionId}){
    try {
        return new Promise((r)=>{
            axios.post(`https://la-service-uat.siemens.com.cn/lapoc/uim/uimanon/wechatLogin/loginToUim`,
            {
                openId,
                nickName,
                sex,
                province,
                city,
                country,
                headimgUrl,
                privilege:privilege.toString(),
                unionId:unionId || 'zhouyusongTest'
            }
            ).then(res=>{
                r(res.data.data)  
            }).catch(err=>{
                console.log('loginToUim error' + err.response.data)
                r(null)
            })
        })
    } catch (error) {
        console.log('[getRedireactUrl serviceError]' + error)
        return null
    }
}

module.exports = getRedireactUrl