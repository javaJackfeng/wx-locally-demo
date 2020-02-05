// pages/list/list.js
const fetch = require('../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    shops: [],
    pageindex:0,
    pagesize:20,
    hasmore:true
  },
  
  loadmore(){
    if(this.data.hasmore){
    let {pageindex,pagesize}=this.data;
    const param = { _page: ++pageindex, _limit: pagesize};

    return fetch(`categories/${this.data.category.id}/shops`, param).then(res=>{
      const shops=this.data.shops.concat(res.data);
      // console.log(res.header['X-Total-Count']);
      const hasmore = pageindex * pagesize < res.header['X-Total-Count'];
      this.setData({ shops:shops,pageindex:pageindex,hasmore:hasmore});
    });}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(2);
    fetch(`categories/${options.cat}`).then((res) => {
      this.setData({
        category: res.data
      });
      wx.setNavigationBarTitle({
        title: res.data.name
      });
      this.loadmore();
      // return fetch(`categories/${this.data.category.id}/shops`,{_page:1,_limit:10});
    })
      // .then(res => {
      //   this.setData({ shops: res.data });
      //   console.log(res.data);
      // })
    ;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (this.data.category.name) {
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      shops: [],
      pageindex: 0,
      hasmore:true});
    this.loadmore().then(()=>{
      wx.stopPullDownRefresh();}
    );
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
      this.loadmore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})