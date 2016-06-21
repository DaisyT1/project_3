$(document).ready(function(){
  getAllUsers();
  $("form#register").on("submit", createUser);
  $('body').on('click', '.edit', editUser);

//
  function getAllUsers() {
  $.get("http://localhost:3000/api/users" , function(users) {

    $(users).each(function(index, user){
      getElements(user , "#index")
      console.log(user.name)
    })

  })
};

function getElements(user, div){

  var person = 
  "<p>" + user.name  + "</p>" +
  "<p>" + user.email  + "</p>" 


  $(div).append(person);

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

// leave this all the function have to be above the line 68
});
















