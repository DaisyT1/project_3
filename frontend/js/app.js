$(document).ready(function(){
  



var token = window.localStorage.getItem('token');

   if (token) {
       $.ajaxSetup({
           headers: { 'Authorisation': 'Bearer ' + token }
       });
   }

//===============================

  $("form#register").on("submit", register);
  $("form#login").on("submit", login);
  $("#logout-button").on("click", logout);
  $('body').on('click', '.edit', editUser);
  

  getUsers();
  showCurrentUser();
  
});

//=========================REGISTER - LOGIN  -LOGOUT==========================
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
    }).done(function(){

      showCurrentUser();

      window.location.reload();
    })
};

function removeToken() {
  return localStorage.removeItem("token");
}


function logout(){
  removeToken();
  window.location.reload();
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

// console.log(thisUser._id)




//===================================================
//--------------- Yo intentando--------------

function showCurrentUser() {
  var user = currentUser()

  if(user) {
    $('.nav').append("<li><a href='#'>" + user.name + "</a></li>");
  } else {
    $('.nav').append("<li><a href='#'>Signin</a></li>")
  }
}



 


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







