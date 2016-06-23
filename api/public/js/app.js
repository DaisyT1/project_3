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
  $("#logoutButton").on("click", logout);
  $("form#allLocations").on("submit", createLocation);
   
  getUsers();
  showCurrentUser();
   


//================================================================  


  getUsers();
  hideAllDivs();
  navbarToggle();
 
  
});//END OF DOCUMENT READY

//================================================================
  
function createLocation() {
    event.preventDefault();

    // console.log($("input#locationName").val());
    // console.log($("input#locationLat").val());
    // console.log($("input#locationLng").val());
    var url = "http://localhost:3000/api/"+thisUser._id+"/locations"
    $.ajax({
      url: url,
      type:'post',
      data: { location: {
        "name": $("input#locationName").val(),
        "lat": $("input#locationLat").val(),
        "long": $("input#locationLng").val()
      }}
    })
    .done(function(data) {
      
      console.log(data);
    });
};

function showLocations(user) {
  event.preventDefault();
  if (user == "current") {
      user = thisUser._id;
  }
  var url = "http://localhost:3000/api/"+user+"/locations"
  $.get(url , function(locations) {

      $(locations).each(function(index, location){
        console.log(location._id);
        console.log(location.name);
        console.log(location.lat);
        console.log(location.long);
        // console.log(user);
      })

    })
  //console.log(thisUser_id);
};

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
  "<p>" + user._id  + "</p>" +
  "<p>" + user.name  + "</p>" +
  "<p>" + user.email  + "</p>" +
  "<p> <button class='btn btn-primary' onclick="+'showLocations("'+user._id+'")'+">"+user.name+"</button> </p>" +
  "<button class='btn btn-primary'>Send</button>" + 
  "<button class='btn btn-primary'>Accept</button>"

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


function showCurrentUser() {
 var user = currentUser()

 if(user) {
   $('.nav').append("<li><a href='#'>" + user.name + "</a></li>");
 } else {
   $('.nav').append("<li><a href='#'>Signin</a></li>")
 }
}
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

   $("#brand").click(function(){
    hideAllDivs()
    $("#map-canvas").show('medium');
    $("#burger-menu").collapse()
  })
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
    $("#burger-menu").collapse('hide')
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

