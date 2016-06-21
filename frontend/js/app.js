$(document).ready(function(){
  //getAllUsers()
  
});

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