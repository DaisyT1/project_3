$(document).ready(function(){

//=================TOKENS===============//
var token = window.localStorage.getItem('token');

   if (token) {
       $.ajaxSetup({
           headers: { 'Authorisation': 'Bearer ' + token }
       });
   }

//===============================

  $("form#register").on("submit", register);
  $("form#login").on("submit", login);
  $('body').on('click', '.edit', editUser);
  

  getUsers();
  hideAllDivs();
  navbarToggle();
 
  
});//END OF DOCUMENT READY

//==============================REGISTER==========================
function register(){
  event.preventDefault();

  $.ajax({
    url:'http://localhost:3000/api/register',
    type:'post',
    data: { user: {
      "name": $("input#name").val(),
      "email": $("input#email").val(),
      "password": $("input#password").val(),
      "passwordConfirmation": $("input#passwordConf").val()
    }}
  })
  .done(function(data) {
    // addUser(data);
    $("input#name").val(''),
    $("input#email").val(''),
    $("input#password").val(''),
    $("input#passwordConf").val('')
    console.log(data);
  });
}

function login(){

  event.preventDefault();
  console.log('hello')

    $.post("http://localhost:3000/api/login" , {
      "email": $("input#loginemail").val(),
      "password": $("input#loginpassword").val()
    },
    function(data){

        window.localStorage.setItem('token' , data.token);

        console.log('logged in');

        $.ajaxSetup({
            headers: { 'Authorisation': 'Bearer ' + data.token }
        });

    });

};

//==========================USERS INDEX=================================
  function getUsers() {
  $.get("http://localhost:3000/api/users" , function(users) {


    $(users.users).each(function(index, user){
      getElements(user , "#index")
      // console.log(user);
    })
  })
};

function getElements(user, div){

  var person = 
  "<p>" + user.name  + "</p>" +
  "<p>" + user.email  + "</p>" +
  "<button>Send</button>" + 
  "<button>Accept</button>"

  $(div).append(person);

}

//=========================================================================
//++++++++++++++ GET THE CURRENT USER +++++++++++++//

function getToken() {
  return localStorage.getItem('token');
}

function currentUser() {
  var token = getToken();

  if(token) {
    var payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload)

    return payload
  }
}

var thisUser = currentUser()

console.log(thisUser._id)

//===================================================


//===================================

//EDIT USER

function editUser(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/users/:id'+$(this).data().id
  }).done(function(user){
    $("input#edit-name").val(user.name),
    $("input#edit-email").val(user.email),
    $("input#edit-password").val(user.password),
    $("input#edit-passwordConfirmation").val(user.passwordConfirmation)
    $('form#editProfile').slideDown()
  });
  $('#editProfile').on('submit', updateUser);
}

var updateUser = function(){
  event.preventDefault();
  var user = {
    user:{
      name: $("input#edit-name").val(),
      email: $("input#edit-email").val(),
      password: $("input#edit-password").val(),
      passwordConfirmation: $("input#edit-passwordConfirmation").val()
    }
  };
  $.ajax({
    method: 'patch',
    url: 'http://localhost:3000/users/:id'+$(this).data().id,
    data: user
  }).done(function(data){
    // not ideal
    // location.reload();
  });
}

  //================TOGGLING=========================/

  // TOGGLE REGISTER

function hideAllDivs(){
    $("#location").hide();
    $("#index").hide();
    $("#register").hide();
    $("#editProfile").hide();
    $("#login").hide();
    $("#logout").hide();
}

function navbarToggle() {

  $("#locationButton").click(function(){
    $("#location").slideToggle("medium");
    $("#locationsShow").slideToggle("medium");
  })
  $("#addFriend").click(function(){
    $("#index").slideToggle("slow");
    $("#map-canvas").slideToggle("slow");
  })
  $("#friendReq").click(function(){
   $("#").slideToggle("medium");
 })
  $("#regButton").click(function(){
    $("#register").slideToggle("medium");
  })
  $("#editProfButton").click(function(){
    $("#editProfile").slideToggle("medium");
  })
  $("#loginButton").click(function(){
    $("#login").slideToggle("medium");
  })
  $("#logoutButton").click(function(){
    $("#logout").slideToggle("medium");
  })
}
