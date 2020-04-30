// pages/NewList/NewList.js
var appInstance = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      defaultType: true,
      passwordType: true,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  eyeStatus: function() {
    if (this.data.defaultType) {
      this.setData({
        passwordType: false,
        defaultType: false,
      })
    } else {
      this.setData({
        passwordType: true,
        defaultType: true,
      })
    }
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
     url: 'http://192.168.1.104:8888/api/v1/users/open',
     data: {
      "full_name": that.data.name,
      "password_1": that.data.password_1,
      "password_2": that.data.password_2,
      "uid":that.data.imagecode,
      "answer":that.data.answer,
      "email":that.data.email,
       },
      method: 'POST',
      header: {
      'Content-Type': 'application/json'
      },
      success: function (res) {
      // console.log(appInstance.globalData)
      that.setData({result:JSON.stringify(res.data.detail)})

  
      if (res.statusCode === 200){
      that.setData({result:'注册成功'})
      appInstance.globalData.cookie = "Bearer "+res.data.access_token
      console.log(appInstance.globalData)
       wx.navigateTo({
         url: '../index/index',
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
   getNumber:function(e){
    this.setData({answer: e.detail.value})
   },
   getAccountInput:function(e){
    this.setData({accout: e.detail.value})
   },
   getPassword_1:function(e){
    this.setData({password_1: e.detail.value})
   },
   getPassword_2:function(e){
    this.setData({password_2: e.detail.value})
   },
   getAccountName:function(e){
     this.setData({name:e.detail.value})
   },
   getAccountEmail:function(e){
    this.setData({email:e.detail.value})
  },


  onLoad: function (options) {
  this.guid()
  this.setData({
    passwordType: true,
    defaultType: true,})
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