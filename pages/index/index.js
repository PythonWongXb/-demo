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
  changeme(){
    console.log('文本框变化了');
    },
  click(event){
    console.log(event.currentTarget)
  },

  formSubmit: function (e) {
    var that = this;
    wx.request({
     url: 'http://127.0.0.1:8888/api/v1/login/access-token',
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