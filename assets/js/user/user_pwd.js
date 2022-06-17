$(()=>{
  var form=layui.form
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    samepwd:function(value){
      if(value===$('#oldpwd').val()){
        return '新密码不能与旧密码一致'
      }
    },
    isnewpwd:value=>{
      if(value!==$('#newpwd').val()){
        return '两次密码输入不一致'
      }
    }
  })
  restPassword()
  function restPassword(){
    $('.layui-form').on('submit',(e)=>{
      e.preventDefault()
      $.ajax({
        method:'post',
        url:'/my/updatepwd',
        data:form.val('restpassword'),
        success:function(res){
          console.log(res);
          if(res.status!==0){
            return layui.layer.msg(res.message)
          }
          layui.layer.msg('修改密码成功,请重新登录')
          setTimeout(function(){
            localStorage.removeItem('token')
            window.parent.location.href='/login.html'
          },1500)
        }
  
      })
    })
  }
})