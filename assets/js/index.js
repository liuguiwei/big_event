$(function(){
  //获取用户信息
  getuserinfo()
  //退出登录
 $("#logout").on('click',()=>{
  layer.confirm('确定退出吗', function(index){
    localStorage.removeItem('token')
   location.href='/login.html'
    layer.close(index);
  })

 })

})


//获取用户信息函数
function getuserinfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    success:(res)=>{
      if(res.status!==0) return layui.layer.msg('获取用户信息失败')
     //按需显示用户信息
      showuserinfo(res.data)
    },
  })
  //按需显示用户信息
function showuserinfo(user){
  if(user.user_pic===null){
    $('.layui-nav-img').hide()
    $('.text_avatar').show().html(user.nickname[0].toUpperCase())
  }
  else{
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text_avatar').hide()
  }
  var name=user.nickname||user.username
  $('#welcome').html('欢迎'+name)
}
}