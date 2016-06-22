$(document).ready(function(){

//============================
var token = window.localStorage.getItem('token');

   if (token) {
       $.ajaxSetup({
           headers: { 'Authorisation': 'Bearer ' + token }
       });
   }

//===============================
  // getAllUsers()
  $("form#register").on("submit", createUser);
  $("form#login").on("submit", login);
  getAllUsers();
  
});

//==============================REGISTER==========================
function createUser(){
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
  function getAllUsers() {
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
