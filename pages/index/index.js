//index.js
//获取应用实例
const app = getApp()

const fetch=require("../../utils/fetch.js");

Page({
  data: {
    categories:[],
    slides:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //  wx.request({
    //    url: 'https://locally.uieee.com/categories',

    //    success:(res)=>{
    //     console.log(res);
    //     this.setData({categories:res.data});
    //    }
    //  });
    // wx.request({
    //   url: 'https://locally.uieee.com/slides',
    //   success: (res) => {
    //     console.log(res);
    //     this.setData({ slides: res.data });
    //   }
    // });
    fetch("slides").then((res)=>{
      this.setData({ slides: res.data });
    })
    fetch("categories").then((res)=>{
      this.setData({ categories: res.data });
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
