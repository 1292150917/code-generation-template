/*
 * @Author: your name
 * @Date: 2020-06-06 12:51:54
 * @LastEditTime: 2020-06-06 12:53:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\vue.config.js
 */ 
module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://127.0.0.1:8020/',
                changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL,               
            }
        }
    }
};