// miniprogram/pages/assist/assist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:'扫描',
    imgSrc:'',
    name:'',
    tel: '',
    address: '',
    list:[],
    items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
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

  },

  changeTab(e){
    console.log(e.currentTarget.dataset.tabname)
    this.setData({
      currentTab : e.currentTarget.dataset.tabname
    })
 
    if(this.data.currentTab == '列表'){
      const db = wx.cloud.database()
      db.collection('users').get().then(res=>{
        console.log(res)
        this.setData({
          list: res.data
        })
      })
    }
  },
  getImage(){ 
    wx.chooseImage({
      success: async (res)=> {
        console.log(res) 
        let str = new Date().getTime();
        const tmp = res.tempFilePaths[0]; 
        let res1 = await  wx.cloud.uploadFile({

          cloudPath: str +'card.png',
          filePath: tmp, // 文件路径
        }) 
        wx.showLoading({
          title: '正在解析',
        })
        let res2=  await  wx.cloud.getTempFileURL({
              fileList: [{
                fileID: res1.fileID, maxAge: 60 * 60, // one hour
              }]
            })  
        wx.cloud.callFunction({
          name:'reg',
          data:{
            src: res2.fileList[0].tempFileURL
          }
        }).then(res=>{ 
          // console.log(res.result)
          let jsonresult = JSON.parse(res.result)
          console.log(jsonresult)

          const infolist = jsonresult.result_list[0].data
          wx.hideLoading();
          this.setData({
            items: infolist
          })
          // const nameitem = infolist.filter((info) => {
          //   return info.item == '姓名' || info.item == '公司'
          // })

         
          // this.setData({
          //   name: nameitem.length > 0 ? nameitem[0].value : '',
          //   tel: infolist.filter((info) => {
          //     return info.item == '手机'
          //   })[0].value,
          //   address: infolist.filter((info) => {
          //     return info.item == '地址'
          //   })[0].value
          // })
        })
        
        this.setData({
          imgSrc: res2.fileList[0].tempFileURL
        }) 
      },
    })
  },
  onSave(){
    const db = wx.cloud.database()

    const data = {}
    this.data.items.forEach( info =>{
      data[info.item] = info.value
    })
    db.collection('users').add({
      data: data,
      success: res =>{
        wx.showToast({
          title: '上传成功！'
        })
      }
    })
  },
  ondelete(e){
    const db = wx.cloud.database()
    db.collection('users').doc(e.currentTarget.dataset.id).remove().then(res =>{
      //todo
 
      db.collection('users').get().then(res => {
        console.log(res)
        this.setData({
          list: res.data
        })
      })

    })
  }


})