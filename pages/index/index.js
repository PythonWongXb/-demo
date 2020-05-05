// pages/NewList/NewList.js
var appInstance = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getUserInfoWechat: function(e) {
    
    appInstance.globalData.userInfo = e.detail.userInfo
    // console.log(appInstance.globalData.userInfo)
  },
  
  login:function(){
    
    var that = this;
    that.setData({wechatlogin: true})
    wx.login({
      success (res) {
        // console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://192.168.1.104:8888/api/v1/payment/openid/',
            data: {
              code: res.code
            },
            method:"GET",
            success(res){
              // console.log(res)
              appInstance.globalData.openid = res.data.openid
              appInstance.globalData.session_key = res.data.session_key

              console.log(appInstance.globalData)
              // console.log(appInstance.globalData.session_key)
              // console.log(appInstance.globalData.userInfo.nickName)
              wx.request({
                url: 'http://192.168.1.104:8888/api/v1/users/CreatUserByWeChat',
                method: "POST",
                data:{
                  full_name: appInstance.globalData.userInfo.nickName,
                  key: appInstance.globalData.openid+"wxb",
                  openid: appInstance.globalData.openid+"wxb"
                },
                success(res){
                  
                  if (res.statusCode==200){
                    console.log('创建成功')
                    
                  }else{
                    console.log('用户已存在')
                  }
    
                    wx.request({
                     url: 'http://192.168.1.104:8888/api/v1/login/access-token',
                     data: {
                      "username": appInstance.globalData.openid+"wxb",
                      "password": appInstance.globalData.openid+"wxb",
                      "scope":that.data.imagecode + ' ' +that.data.answer
                       },
                      method: 'POST',
                      header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      success: function (res) {
  
                      that.setData({result:JSON.stringify(res.data.detail)})
                
                  
                      if (res.statusCode === 200){
                      that.setData({result:'登录成功'})
                      appInstance.globalData.cookie = "Bearer "+res.data.access_token
                      console.log(appInstance.globalData)
                       wx.navigateTo({
                         url: '../center/center',
                       })
                      }
                    },
                     
                    })
                   
                 
                }
              })
            }
          })
          
        } else {
          console.log('登录失败！')
        }
        
      }
    })
      
   
  },


  contactus:function(){
    wx.navigateTo({
      url: '../admin/contactus',
    })
  },

  changeme(){
    console.log('文本框变化了');
    },
  click(event){
    console.log(event.currentTarget)
  },

  formSubmit: function (e) {
    var that = this;
    wx.request({
     url: 'http://192.168.1.104:8888/api/v1/login/access-token',
     data: {
      "username": that.data.accout,
      "password": that.data.password,
      "scope":that.data.imagecode + ' ' +that.data.answer
       },
      method: 'POST',
      header: {
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log(appInstance.globalData)
      that.setData({result:JSON.stringify(res.data.detail)})

  
      if (res.statusCode === 200){
      that.setData({result:'登录成功'})
      appInstance.globalData.cookie = "Bearer "+res.data.access_token
      console.log(appInstance.globalData)
       wx.navigateTo({
         url: '../center/center',
       })
      }
    },
     
    })
   },
   guid: function(){
    var r = "wxb"+(((1+Math.random())*0x10000)|0).toString(16).substring(1) +"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1)+"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1)+"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1) 
    this.setData({imageLoad: "http://192.168.1.104:8888/api/v1/identify/" + r})
    this.setData({imagecode:"image_code_"+r})
    // console.log(r)
   },
   goindex: function(){
    wx.navigateTo({
      url: '../index/index',
    })
   },
   restpassword:function(){
    wx.navigateTo({
      url: '../restpassword/restpassword',
    })
   },
   getNumber:function(e){
    this.setData({answer: e.detail.value})
   },
   getAccountInput:function(e){
    this.setData({accout: e.detail.value})
   },
   getPassword:function(e){
    this.setData({password: e.detail.value})
   },
  formReset: function () {
    console.log('form发生了reset事件')
   },
  
  onLoad: function (options) {
  this.guid()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})