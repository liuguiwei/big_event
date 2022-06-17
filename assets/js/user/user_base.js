$(function(){
  var form=layui.form
  form.verify({
    nicname:function(value){
      if(value.length>6){
        return '用户昵称不能超过6位'
      }
    }
  })

  getuserInfo()
  function getuserInfo(){
    $.ajax({
      method:'get',
      url:'/my/userinfo',
      success:function(res){
        if(res.status!==0){
          layui.layer.msg('获取用户信息失败')
        }
        //设置表单的值
        layui.form.val("userform",res.data)
      }
    })
  }
  // 提交修改用户信息
  $('.layui-form').on('submit',e=>{
    e.preventDefault()
    $.ajax({
      method:'post',
      url:'/my/userinfo',
      // 获取表单的值
      data:form.val('userform'),
      success:res=>{
        if(res.status!==0){
          return layui.layer.msg('更改用户资料失败')
        }
        window.parent.getuserinfo()
        return layui.layer.msg('更改用户资料成功')
      }
    })
  })
  //重置修改用户资料表单
  $('#reset').on('click',e=>{
    e.preventDefault()
    getuserInfo()
  })

})