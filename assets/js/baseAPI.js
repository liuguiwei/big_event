$.ajaxPrefilter(options=>{
  options.url='http://www.liulongbin.top:3007'+options.url
  console.log(options.url);
})
// http://www.liulongbin.top:3007
// http://ajax.frontend.itheima.net