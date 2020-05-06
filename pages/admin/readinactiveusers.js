// pages/admin/readinactiveusers.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUser: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.101:8888/api/v1/users/SearchInactiveUsers',
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success: function(res){
        if(res.statusCode==200){
          that.setData({result: res.data})
          console.log(that.data.result)
        }else{
          that.setData({result: false})
        }
      
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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