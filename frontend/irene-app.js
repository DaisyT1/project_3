$(document).ready(function(){
  getUsers();
  $("form#register").on("submit", createUser);


  function createUser(){
  event.preventDefault();

  $.ajax({
    url:'http://localhost:3000/users',
    type:'post',
    data: { user: {
      "name": $("input#name").val(),
      