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
  editInfo:function(e){
  appInstance.globalData.email = e.currentTarget.dataset.email
  appInstance.globalData.id = e.currentTarget.dataset.id
  console.log(appInstance.globalData.email)
  console.log(appInstance.globalData.id)
  wx.navigateTo({
    url: '../admin/edituser',
  })
  },

  getUsernum:function(e){
    this.setData({usernum: e.detail.value})
  },
  getUserid:function(e){
    this.setData({userid: e.detail.value})
  },
  getUsername:function(e){
    this.setData({username: e.detail.value})
  },
  getUserNum: function(){
    this.setData({result:"",results:"",error:""})
    var that = this;
    wx.request({
      url: 'http://192.168.1.101:8888/api/v1/users/SearchEmail/'+that.data.usernum,
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
        that.setData({error:"抱歉，查无此人"})
        that.setData({status:false})
      }
      that.data.time += 1
      that.setData({time: that.data.time})
      
      }
    })
  },
  getUserId: function(){
    this.setData({result:"",results:"",error:""})
    var that = this;
    wx.request({
      url: 'http://192.168.1.101:8888/api/v1/users/SearchId/'+that.data.userid,
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
        that.setData({error:"抱歉，查无此人"})
        that.setData({status:false})
      }
      that.data.time += 1
      that.setData({time: that.data.time})
      
      }
    })
  },
  getUserName: function(){
    this.setData({result:"",results:"",error:""})
    var that = this;
    wx.request({
      url: 'http://192.168.1.101:8888/api/v1/users/SearchName/'+that.data.username,
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success: function(res){
      if (res.statusCode == 200){
        that.setData({results: res.data})
        that.setData({statuses:true})
        that.setData({status:false})
        console.log(that.data.results)
      }else{
        that.setData({error:"抱歉，查无此人"})
        that.setData({statuses:false})
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