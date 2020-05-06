// pages/admin/edituser.js
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // bind: ""
  },

  go:function(){
    var that = this;
    if(this.data.bindphone){
      // 请求验证密码
        wx.request({
         url: 'http://192.168.1.101:8888/api/v1/login/access-token',
         data: {
          "username": that.data.newbindphone,
          "password": that.data.newbindpassword,
          "scope":that.data.imagecode + ' ' +that.data.identifycode
           },
          method: 'POST',
          header: {
          'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
          that.setData({result:JSON.stringify(res.data.detail)})

          if (res.statusCode === 200){
          that.setData({
            result:'登录成功',
            bind: that.data.newbindphone
            
          })
          
            console.log('密码正确')
          }
        },
      })
       
    }else{
      console.log(0)
    }
  },

  guid: function(){
    var r = "wxb"+(((1+Math.random())*0x10000)|0).toString(16).substring(1) +"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1)+"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1)+"-"+ (((1+Math.random())*0x10000)|0).toString(16).substring(1) 
    this.setData({imageLoad: "http://192.168.1.101:8888/api/v1/identify/" + r})
    this.setData({imagecode:"image_code_"+r})
  
   },
  getidentifycode:function(e){
    this.setData({
      identifycode: e.detail.value
    })
  },

  getnewbindphone:function(e){
    this.setData({
      newbindphone: e.detail.value
    })
  },
  getnewbindpassword:function(e){
    this.setData({
      newbindpassword: e.detail.value
    })
  },
  
  getbindphone:function(e){
    this.setData({getphone: e.detail.value})
  },

  charge:function(){
    wx.navigateTo({
      url: '../charge/charge',
    })
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
      url: 'http://192.168.1.101:8888/api/v1/items/',
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

  changephone: function() {
    if (this.data.BindPhone) {
  
      this.setData({
        BindPhone: false,
        bindphone: false,
        getphone: "",
        newbindphone: "",
        newbindpassword: "" ,
        identifycode: ""
        
      })
    } else {
     
      this.setData({
        BindPhone: true,
        bindphone: true

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
      url: 'http://192.168.1.101:8888/api/v1/users/me',
      header: {
        "content-type": "application/json",
        "authorization": appInstance.globalData.cookie
      },
      method:"GET",
      success: function(res){
      if (res.statusCode == 200){
        that.setData({results: res.data})
        console.log(that.data.results)
        that.setData({
          is_active: res.data.is_active,
          full_name: res.data.full_name,
          email: res.data.email
        })
      }
      }
    })
  },

  updateUserInfo:function(){
    
    this.go()
    var that = this;
    wx.request({
      url: 'http://192.168.1.101:8888/api/v1/users/me',
      data:{
        email:that.data.email,
        full_name: that.data.full_name,
        password: that.data.password,
        bind: that.data.bind
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
        
          // that.record()
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
    BindPhone:false,
    ChangeTime:false,
  })
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