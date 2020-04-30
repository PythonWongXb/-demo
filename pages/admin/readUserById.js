// pages/admin/readUserById.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  value:[],
  time:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getUsernum:function(e){
    this.setData({usernum: e.detail.value})
  },

  getUser: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.104:8888/api/v1/users/SearchEmail/'+that.data.usernum,
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success: function(res){
      if (res.statusCode == 200){
        that.setData({result: res.data})
        that.setData({status:true})
        console.log(that.data.result)
      }else{
        that.setData({result:"抱歉，查无此人"})
        that.setData({status:false})
      }
      that.data.time += 1
      that.setData({time: that.data.time})
      
      }
    })
  },
  getclick:function(e){

  },

  onLoad: function (options) {

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