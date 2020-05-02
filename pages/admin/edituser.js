// pages/admin/edituser.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  getChangeScores:function(e){
    this.setData({scores: e.detail.value})
  },
  getChangeTime:function(e){
    this.setData({time: e.detail.value})
  },
  getChangeName:function(e){
    this.setData({full_name:e.detail.value})
  },
  getChangePassowrd:function(e){
    this.setData({password:e.detail.value})
  },

  record:function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.104:8888/api/v1/items/',
      data:{
        item_in:{
        earn_score: that.data.scores,
        cost_money: 0
        },
        item_id:appInstance.globalData.id
  
      },
      method:"POST",
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success:function(res){

        if(res.statusCode==200){
          that.setData({echo:true})
          wx.navigateTo({
            url: '../admin/edituser',
          })
        }else{
          that.setData({error: true})
        }
        
      // console.log(res)
      // appInstance.globalData.cookie = ''
      
      }
      
    })
  },

  changescores: function() {
    if (this.data.ChangeScore) {
  
      this.setData({
        ChangeScore: false,
        scorestype:false,
        scores:this.data.results.scores
      })
    } else {
     
      this.setData({
        ChangeScore: true,
        scorestype: true

      })
    }
  },

  changetime: function() {
    if (this.data.ChangeTime) {
  
      this.setData({
        ChangeTime: false,
        timetype:false,
        time:this.data.results.time
      })
    } else {
     
      this.setData({
        ChangeTime: true,
        timetype: true

      })
    }
  },

changestatus: function() {
    if (this.data.is_active) {
  
      this.setData({
        pictype: true,
        is_active:false
      })
    } else {
     
      this.setData({
        pictype: false,
        is_active: true

      })
    }
  },

  changePassowrd: function() {
    if (this.data.changpassword) {
      this.setData({
        changpassword: false,
        defaultTypepsw: false,
        password:""
      })
    } else {
      this.setData({
        changpassword: true,
        defaultTypepsw: true,
        // full_name: that.data.results.full_name
      })
    }
  },

  eyeStatus: function() {
    if (this.data.defaultType) {
      this.setData({
        passwordType: false,
        defaultType: false,
        full_name: this.data.results.full_name
      })
    } else {
      this.setData({
        passwordType: true,
        defaultType: true,
        // full_name: that.data.results.full_name
      })
    }
  },


  getUserInfo: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.104:8888/api/v1/users/SearchEmail/'+ appInstance.globalData.email,
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success: function(res){
      if (res.statusCode == 200){
        that.setData({results: res.data})
        console.log(that.data.results)
        that.setData({
          is_active: res.data.is_active,
          time: res.data.time,
          scores: res.data.scores,
          full_name: res.data.full_name,

        })
      }
      }
    })
  },

  updateUserInfo:function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.104:8888/api/v1/users/'+appInstance.globalData.email,
      data:{
        email:appInstance.globalData.email,
        full_name: that.data.full_name,
        is_active: that.data.is_active,
        is_superuser:that.data.is_superuser,
        password: that.data.password,
        scores: that.data.scores,
        time: that.data.time
      },
      method:"PUT",
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      success:function(res){
        // that.setData({echo:true})
        if(res.statusCode==200){
          console.log(res)
          that.record()
        }else{
          that.setData({error: true})
        }
        
        
      // appInstance.globalData.cookie = ''
      
      }
    })

  },

  getclick:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getUserInfo()
  this.setData({
    passwordType: false,
    defaultType: false,
    password:"",
    ChangeScore:false,
    ChangeTime:false,
  })
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