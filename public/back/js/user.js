$(function () {
 // 当前页码
 var currentPage = 1;
 // 显示多少行数据
 var pageSize = 8;



 function render() {
  $.ajax({
   type: "get",
   url: "/user/queryUser",
   data: {
    page: currentPage,
    pageSize: pageSize
   },
   success: function (data) {
    console.log(data);
    var html = template("tpl", data);
    $("tbody").html(html);
   }
  });

  // 分页功能
  $("#paginator").bootstrapPaginator({
   bootstrapMajorVersion: 3, //指定bsp的版本
   currentPage: currentPage,
   size: "small", //分页栏的大小
   totalPages: Math.ceil(data.total / pageSize), //总共能分成多页
   onPageClicked: function (event, originalEnevent, type, page) {
    // 为按钮添加点击事件 page :当前点击的按扭值
    // 点击了谁就让当前页第一个序号变为点击的那个页码
    currentPage = page;
    render();
   }
  })
 }





})