$(function(){
   // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

 //-------------------------------------------------------------------------------------
  $('#openImgFile').on('click',()=>{
  $('#chooseImg').click()
  })    
  //更换裁剪的图片
  $('#chooseImg').on('change',function(e){
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })
  //上传图片
  $('#btnUpload').on('click',()=>{
    //拿到用户裁剪后的图片
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }) .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      method:'post',
      url:'/my/update/avatar',
      data:{
        avatar:dataURL
      },
      success:res=>{
        if(res.status!==0){
          return layui.layer.msg('头像上传失败')
        }
        else{
          window.parent.getuserinfo()
          return layui.layer.msg('头像上传成功')
        }
      }
    })
  
  })
})