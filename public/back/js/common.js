// 校验用户是否有登录功能
// 路径中，并没有login.html
if (location.href.indexOf("login.html") < 0) {
 $.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  success: function (data) {
   if (data.error === 400) {
    //说明用户没有登录，跳转到登录页面
    location.href = "login.html";
   }
  }
 });
}



// 进度条功能
//希望在ajax调用之前start，在ajax调用结束
$(document).ajaxStart(function () {

 setTimeout(function () {
  // 让进度条显示出来
  NProgress.start();
 }, 500);

});

$(document).ajaxStop(function () {
 setTimeout(function () {
  // 让进度条结束
  NProgress.done();
 }, 500);
})