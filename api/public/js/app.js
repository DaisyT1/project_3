

$(function(){  
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
  $("form#allLocations").on("submit", createLocation);

  $(".dropdown-menu").on("click", "li", function(event){
       // console.log(this.id);
       var res = this.id.split(" ");
       //console.log(res[0],res[1]);
       getDirectionsMyLocationToSomewhere(res[0],res[1]);
   });

  // $("ul").on('click', 'li', function () {
  //    var id = this.id;
  //    //play with the id
  // });

//================================================================  


  getUsers();
  hideAllDivs();
  navbarToggle();
 
  
});//END OF DOCUMENT READY

//================================================================

function createLocation() {
    event.preventDefault();

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
    // console.log("test");
};


function showLocations(user) {
  event.preventDefault();
  if (user == "current") {
      user = thisUser._id;
  }
  var url = "http://localhost:3000/api/"+user+"/locations"
  $.get(url , function(locations) {
      console.log(locations);
      $(locations).each(function(index, location){
        console.log(location);
      })

    })
  //console.log(thisUser_id);
};

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
   }).done(function(){

     showCurrentUser();

     window.location.reload();
   })
};

function removeToken() {
 return localStorage.removeItem("token");
}

//==========================USERS INDEX=================================
  
function getUsers() {
  $.get("http://localhost:3000/api/users" , function(users) {


    $(users.users).each(function(index, user){
      loadUserDropDownLocation(user._id)
      // getElements(user , "#index")
      // console.log(user);
    })
  })
};



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
function getElements(user, div){

  var person = 
  "<p>" + user._id  + "</p>" +
  "<p>" + user.name  + "</p>" +
  "<p>" + user.email  + "</p>"
  "<p> <button class='btn btn-primary' onclick="+'showLocations("'+user._id+'")'+">"+user.name+"</button> </p>" +
  "<button class='btn btn-primary'>Send</button>" + 
  "<button class='btn btn-primary'>Accept</button>"

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
  })
  $("#editProfButton").click(function(){
    $("#editProfile").slideToggle("medium");
  })
  $("#loginButton").click(function(){
    $("#login").slideToggle("medium");
    login();
  })
  $("#logoutButton").click(function(){
    $("#logout").slideToggle("medium");
  })
}


//====================================================================================
//====================================================================================
//====================================================================================
//                                         MISHAL
//====================================================================================
//====================================================================================
//====================================================================================



//====================================================================================
//====================================================================================
//====================================================================================
//                                         MAP
//====================================================================================
//====================================================================================
//====================================================================================









  var markers = [];
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var address;
  var myLocation;

  $('#locateMe').click( function(e) {
    e.preventDefault(); /*your_code_here;*/
    getMyLocation(); 
  });

  var canvas = document.getElementById("map-canvas");

  var mapOptions = {
    zoom:12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(canvas , mapOptions);


  function getMyLocation() {
      navigator.geolocation.getCurrentPosition(function(position){

        var latlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: './images/marker.png'
        });

      });
  }

  // $("#getLocation").click(function(){
  //     // navigator.geolocation.getCurrentPosition(function(position){

  //     //   // console.log(position.coords.latitude);
  //     //   // console.log(position.coords.longitude);
  //     //   getLocationFromLatLng(position.coords.latitude,position.coords.longitude);
  //     //   console.log(myLocation);
        
  //     //   myLocation = myLocation.replace(", Reino Unido", "");

  //     //   console.log(myLocation);
  //     //   $('#start')
  //     //            .append($("<option></option>")
  //     //             .attr("value",myLocation)
  //     //             .text("My location")); 

  //     // });
  //     getMyLocation();
  // });
  
  // directionsDisplay.setMap(map);
  // directionsDisplay.setPanel(document.getElementById('direction-panel'));

  // var control = document.getElementById('locations-panel');
  // // control.style.display = 'block';
  // // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  // //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      //getLocationFromLatLng(place.geometry.location.lat(),place.geometry.location.lng());
      console.log(place.geometry.location.lat(),place.geometry.location.lng());
      $("input#locationLat").val(place.geometry.location.lat());
      $("input#locationLng").val(place.geometry.location.lng());
    });

    map.fitBounds(bounds);
  });

  (function test() {
    console.log("test");
  });
  // function getLocationFromLatLng(lat,lng) {
  //       $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +" ,"+lng+"&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q", 
  //         function(location){
  //            //console.log(location.results[0].formatted_address);
  //            //consoleLocation(location.results[0].formatted_address);
  //            myLocation = location.results[0].formatted_address;
  //   });
  // }

  // // var onChangeHandler = function() {
  // //   calculateAndDisplayRoute(directionsService, directionsDisplay);
  // // };
  // // document.getElementById('start').addEventListener('change', onChangeHandler);
  // // document.getElementById('end').addEventListener('change', onChangeHandler);
  
  // function getDirections() {
  //   calculateAndDisplayRoute(directionsService, directionsDisplay);
  // };
  
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    directionsDisplay.setMap(map);

    directionsService.route({
      origin: "se1 3sa",
      destination: "wr3 8dp",
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  }

  function getDirectionsMyLocationToSomewhere(lat, long) {



      navigator.geolocation.getCurrentPosition(function(position){
        var destiLatLng = lat+","+long;
        var originLatlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);

          directionsDisplay.setMap(map);

          directionsService.route({
            origin: originLatlng,
            destination: destiLatLng,
            // "33.661565,73.041330",
            travelMode: google.maps.TravelMode.WALKING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });

      });      
  };

  function loadUserDropDownLocation(user) {
      var person;
      if (user == "current") {
          user = thisUser._id;
      }
      var url = "http://localhost:3000/api/"+user+"/locations"
      $.get(url , function(users) {
          
          $(users).each(function(index, user){
              
              $('.dropdown-menu').append('<li id="userName">'+user.name+'</li>');
              $('.dropdown-menu').append('<li class="divider"></li>');
              
              $(users.locations).each(function(index, location){
            
                  $('.dropdown-menu').append('<li id="'+location.lat+' '+location.long+'">'+location.name+'</li>');

              });
              
          });

        });
  };

 
});