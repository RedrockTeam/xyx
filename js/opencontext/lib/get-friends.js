let outPut = wx.getFriendCloudStorage({ keyList: ['openid'], success(res) {
    console.log(res)

    let idList = []
    res.data.forEach(el => {
      idList.push(el.openid)  
    })

    console.log(idList)
  } 
})

export default outPut