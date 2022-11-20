// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    tagNames: ["超能力", "岩石", "钢", "妖精", "一般", "草", "虫", "火", "冰", "毒", "幽灵", "水", "电", "格斗", "恶", "地面", "龙", "飞行"],
    pickIndexs: [{
      "index": 0,
      "isTaijing": false
    }]
  },
  // 事件处理函数
  addIndex() {
    this.data.pickIndexs.push({
      "index": 0,
      "isTaijing": false
    });
    this.setData({
      pickIndexs: this.data.pickIndexs
    });
  },
  clearIndex() {
    this.setData({
      pickIndexs: [{
        "index": 0,
        "isTaijing": false
      }]
    });
  },
  submit() {
    let body=[]
    this.data.pickIndexs.forEach(element => {
      body.push({
        "element":this.data.tagNames[element.index],
        "isTaijing":element.isTaijing
      })
    });
    var that=this
    wx.request({
      url: "https://pokemon.arloor.com:8080/api/pokemon",
      data:body,
      method:"POST",
      header:{
        "content-type": "application/json; charset=utf-8"
      },
      success: function (res) {
        that.setData({
          result: res.data.msg
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.currentTarget.dataset.index)
    this.data.pickIndexs[e.currentTarget.dataset.index].index = parseInt(e.detail.value)
    this.setData({
      pickIndexs: this.data.pickIndexs
    });
  },
  taijing: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.currentTarget.dataset.index)
    this.data.pickIndexs[e.currentTarget.dataset.index].isTaijing = e.detail.value
    this.setData({
      pickIndexs: this.data.pickIndexs
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})