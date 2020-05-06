// pages/NewList/NewList.js
var appInstance = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  getNewPassword:function(e){
    this.setData({newpassword: e.detail.value})
  },
  
  restPassword: function(){
    var that = this;
    wx.request({
     url: 'http://192.168.1.101:8888/api/v1/reset-password/',
     data: {
      message_email: that.data.email,
      message_code: that.data.message_code,
      new_password: that.data.newpassword
       },
      method: 'POST',
      header: {
      'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({result: ""})
        that.setData({res: JSON.stringify(res.data)})
        // console.log(res)
        if (res.statusCode === 200){
          that.setData({result: "修改成功,去登录吧"})
          wx.navigateTo({
            url: '../index/index',
          })

        }else{
          that.setData({result: "修改失败!，请填写正确的验证码"})
        }
      },
    })
   },

  postPicIdentifyCode: function(){
    var that = this;
    wx.request({
     url: 'http://192.168.1.101:8888/api/v1/password-recovery/',
     data: {
      answer: that.data.answer,
      email: that.data.email,
      identify_code: that.data.imagecode
       },
      method: 'POST',
      header: {
      'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({result: "!"})
        that.setData({res: JSON.stringify(res.data)})
        // console.log(res)
        if (res.statusCode === 200){
          that.setData({result: "验证码发送成功！"})
          
          that.setData({
            gotmessage: true
          
          })
        }else{
          that.setData({result: "获取短信验证码失败!"})
        }
      },
    })
   },


   guid: function(){
    var r = "wxb"+(((1+Math.random())*0x10000)|0).toString(16).substring(1) +"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1)+"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1)+"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1) 
    this.setData({imageLoad: "http://192.168.1.101:8888/api/v1/identify/" + r})
    this.setData({imagecode:"image_code_"+r})
    // console.log(r)
   },
 
   getNumber:function(e){
    this.setData({answer: e.detail.value})
   },
   getmessage:function(e){
    console.log(e)
    this.setData({message_code: e.detail.value})
    if(e.detail.cursor==4){
      this.setData({inputpassword: true})
    }
    
   },
   
   getAccountEmail:function(e){
    this.setData({email:e.detail.value})
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