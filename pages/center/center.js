// pages/center/center.js
var appInstance = getApp()
console.log(appInstance.globalData.cookie)
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserNum: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.104:8888/api/v1/users/SearchEmail/'+that.data.email,
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success: function(res){
      if (res.statusCode == 200){
        that.setData({result: res.data})
      
       
      }
      
      }
    })
  },

  getUser: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.104:8888/api/v1/users/me',
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success: function(res){
      that.setData({email: res.data.email})
      that.getUserNum()
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  gifts:function(){
  wx.navigateTo({
    url: '../gifts/gifts',
  })
  },


  goToeditInfos:function(){
    wx.navigateTo({
      url: '../all/editUserInfo',
    })
  },

  goTorestPassword:function(){
    wx.navigateTo({
      url: '../restpassword/restpassword',
    })
  },

  readUserById:function(){
    wx.navigateTo({
      url: '../admin/readUserById',
    })
  },

  readUsers:function(){
    wx.navigateTo({
      url: '../admin/readUsers',
    })
  },

  readInactiveUsers:function(){
    wx.navigateTo({
      url: '../admin/readinactiveusers',
    })
  },
  
  onLoad: function (options) {
  this.getUser()
  
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