// 表单校验功能实现,使用bootstrap-validator

$(function () {

 // 要求：1. 用户名不能为空
 // 2. 用户密码不能为空
 // 3. 用户密码长度为6-12位

 //初始化表单验证插件
 var $form = $("#form");
 $form.bootstrapValidator({

  //2. 指定校验时的图标显示
  feedbackIcons: {
   valid: 'glyphicon glyphicon-ok',
   invalid: 'glyphicon glyphicon-remove',
   validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段,配置校验规则
  fields: {
   //校验用户名，对应name表单的name属性

   username: {
    validators: {
     notEmpty: {
      message: '用户名不能为空'
     },
     callback: {
      message: "用户名错误"
     }
    }
   },
   password: {
    validators: {
     notEmpty: {
      message: '用户密码不能为空'
     },
     stringLength: {
      min: 6,
      max: 12,
      message: '用户名长度必须在6到12之间'
     },
     callback: {
      message: "用户密码错误"
     }
    }
   }
  }
 });

 // 表单初始化后，就会有一个校验实例
 var validator = $form.data("bootstrapValidator");

 // 当表单验证成功时会触发success.form.bv事件，我们需要禁止表单自动提交，使用ajax进行表单验证
 $form.on("success.form.bv", function (e) {
  // 当校验成功的时候才执行
  e.preventDefault();

  // 表单校验成功，使用ajax提交
  // 发送ajax请求，意味着需要获取到username与password的值
  $.ajax({
   type: "post",
   url: "/employee/employeeLogin",
   data: $form.serialize(),
   success: function (data) {
    if (data.success) {
     location.href = "index.html";
    } else {
     if (data.error === 1000) {
      // 使用js代码让username这个字段校验失败
      // 第一个参数：name属性
      // 第二个参数：INVALID VALID
      // 第三个参数
      validator.updateStatus("username", "INVALID", "callback");
     }
     if (data.error === 1001) {

      validator.updateStatus("password", "INVALID", "callback");
     }
    }
   }
  })
 });

 // 点击重置按钮时，需要重置表单的错误提示信息。
 $("[type='reset']").on("click", function () {
  // 调用插件的重置的方法
  validator.resetForm();
 })

});