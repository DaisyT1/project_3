$(function(){  

  var markers = [];
  var marker;
  var friendMarker;
  var startMarker;
  var destinationMarker;
  var friendstartMarker;
  var friendDestinationMarker;
  var directionsDisplay = new google.maps.DirectionsRenderer(
    {
        suppressMarkers: true
    });
  var directionsService = new google.maps.DirectionsService;
  var address;
  var myLocation;
  var socketMassage = {
    actualLat: "",
    actualLong: "",
    destLat: "",
    destLong: ""
  };
  var friendDirection; 
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

//===============================  FUNCTION FOR LOCATIONS PER USER AND SERCHING ON MAP ON CLICK LINE 88 HTML
  $(".dropdown-menu").on("click", "li", function(event){
       // console.log(this.id);
      res = this.id.split(" ");
      socketMassage.destLat = res[0],
      socketMassage.destLong = res[1],
      //console.log(res[0],res[1]);
      
      getDirectionsMyLocationToSomewhere(res[0],res[1]);
   });

  $('#friendDestLat').on("change", function () {
    getDirectionsFriendLocationToSomewhere();
  });

  $('#friendDestLong').on("change", function () {
    getDirectionsFriendLocationToSomewhere();
  });

//================================================================  
  getUsers();
  hideAllDivs();
  navbarToggle();
  showCurrentUser();
  // showLocations();
 
function createLocation() {
    event.preventDefault();

    var url = "api/"+thisUser._id+"/locations"
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
  var url = "api/"+user+"/locations"

  $.get(url , function(locations) {
      $(locations).each(function(index, location){
        console.log(location._id);
        console.log(location.name);
        console.log(location.lat);
        console.log(location.long);

        var place = 
          "<p>" + location._id  + "</p>" +
          "<p>" + location.name  + "</p>" +
          "<p>" + location.lat  + "</p>" +
          "<p>" + location.long  + "</p>" 

          $("#locationShow").append(place);

      $("#locationButton").click(function(){
        $("#locationShow").slideToggle("medium");
        })
      })
    })
  //console.log(thisUser_id);
};

//=========================REGISTER - LOGIN  -LOGOUT==========================

function register(){
  event.preventDefault();
  $.ajax({
    url:'api/register',
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
    $.post("api/login" , {
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
  $.get("api/users" , function(users) {
    $(users.users).each(function(index, user){
      loadUserDropDownLocation(user._id)
      // getElements(user , "#index")
      // console.log(user);
    })
  })
};

function getElements(user, div){
  var person = 
  "<p>" + user._id  + "</p>" +
  "<p>" + user.name  + "</p>" +
  "<p>" + user.email  + "</p>" +
  "<button class='btn btn-primary' id='locationButton' onclick="+'showLocations("'+user._id+'")'+">"+user.name+"</button>" +
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


//====================EDIT USER=======================


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
    url: 'users/:id'+$(this).data().id
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
    url: 'users/:id'+$(this).data().id,
    data: user
  }).done(function(data){
    // not ideal
    // location.reload();
  });
}
  //================TOGGLING=========================/

function hideAllDivs(){
    $("#location").hide();
    $("#index").hide();
    $("#register").hide();
    $("#editProfile").hide();
    $("#login").hide();
    $("#logout").hide();
}

function hideAllDivsSlow(){
    $("#location").hide("slow");
    $("#index").hide("slow");
    $("#register").hide("slow");
    $("#editProfile").hide("slow");
    $("#login").hide("slow");
    $("#logout").hide("slow");
}

function navbarToggle() {
  $("#brand").click(function(){
    hideAllDivs()
    $("#map-canvas").show('medium');
    $('.navbar-collapse').removeClass('in');
  })
  $("#locationButton").click(function(){
    $('.navbar-collapse').removeClass('in');
    $("#location").slideToggle("medium");
  })
  $("#addFriend").click(function(){
    // $("#collapse").hide("slow");
    $('.navbar-collapse').removeClass('in');
    $("#index").slideToggle("slow");
    $("#map-canvas").slideToggle("slow");
    $('.navbar-collapse').removeClass('in');
  })
  $("#friendReq").click(function(){
    $("#").slideToggle("medium");
    $('.navbar-collapse').removeClass('in');
 })
  $("#regButton").click(function(){
    $("#register").slideToggle("medium");
    $('.navbar-collapse').removeClass('in');
  })
  $("#editProfButton").click(function(){
    $("#editProfile").slideToggle("medium");
    $('.navbar-collapse').removeClass('in');
  })
  $("#loginButton").click(function(){
    $("#login").slideToggle("medium");
    $('.navbar-collapse').removeClass('in');
  })
  $("#logoutButton").click(function(){
    $("#logout").slideToggle("medium");
    $('.navbar-collapse').removeClass('in');
  })
  $('#map-canvas').click(function(){
      $('.navbar-collapse').removeClass('in');
      hideAllDivsSlow()
  })
}

//====================================================================================
//====================================================================================
//====================================================================================
//                                         SOCKET
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



  $('#locateMe').click( function(e) {
    e.preventDefault(); /*your_code_here;*/
    //getMyLocation();
    startTrack(); 
  });

  $('#locateMyFriend').click( function(e) {
    e.preventDefault(); /*your_code_here;*/
    //getMyLocation();
    startTrackMyFriend();
    getDirectionsFriendLocationToSomewhere(); 
  });
  
  var canvas = document.getElementById("map-canvas");

  var myStyles =[
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [
                { visibility: "off" }
          ]
      }
  ];


  var mapOptions = {
    zoom:10,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: myStyles
  }

  var map = new google.maps.Map(canvas , mapOptions);


  function getMyLocation() {
      navigator.geolocation.getCurrentPosition(function(position){

        var latlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);

        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: './images/marker.png'
        });

      });
  }

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
  var markersArray = [];
  function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    
  }

  function getDirectionsMyLocationToSomewhere(lat, long) {
      clearMarkers();
      navigator.geolocation.getCurrentPosition(function(position){
        var destiLatLng = lat+","+long;
        var originLatlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);
          console.log(originLatlng);
          console.log(destiLatLng);

          directionsDisplay = new google.maps.DirectionsRenderer({
              polylineOptions: {
                strokeColor: "orange",
                suppressMarkers: true
              }
            });

        

          directionsDisplay.setMap(map);

          directionsService.route({
            origin: originLatlng,
            destination: destiLatLng,
            // "33.661565,73.041330",
            travelMode: google.maps.TravelMode.WALKING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              var leg = response.routes[ 0 ].legs[ 0 ];
              
              if (startMarker != undefined) {
                // Marker already created - Move it
                startMarker.setPosition(leg.start_location);
              }
              else {
                // Marker does not exist - Create it
                startMarker = new google.maps.Marker({
                  position: leg.start_location,
                  map: map,
                  //draggable: true,
                  icon: '/images/marker.png'
                });
              }
              if (destinationMarker != undefined) {
                // Marker already created - Move it
                destinationMarker.setPosition(leg.end_location);
              } else {
                // Marker does not exist - Create it
                destinationMarker = new google.maps.Marker({
                  position: leg.end_location,
                  map: map,
                  //draggable: true,
                  icon: '/images/marker.png'
                });
              }
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
          socketMassage.lat = position.coords.latitude;
          socketMassage.long = position.coords.longitude;
          socketMassage.destLat = lat;
          socketMassage.destLong = long;
          socket.emit('chat message', socketMassage);   
      });

         
  };
  
  function getDirectionsFriendLocationToSomewhere() {

      navigator.geolocation.getCurrentPosition(function(position){
        var destiLatLng =  $("#friendDestLat").val()+","+$("#friendDestLong").val();
        var originLatlng = new google.maps.LatLng( position.coords.latitude,position.coords.longitude);

    

          directionsDisplay = new google.maps.DirectionsRenderer({
              polylineOptions: {
                strokeColor: "blue",
                suppressMarkers: true
              }
            });

          

          directionsDisplay.setMap(map);

          directionsService.route({
            origin: originLatlng,
            destination: destiLatLng,
            // "33.661565,73.041330",
            travelMode: google.maps.TravelMode.WALKING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              var leg = response.routes[ 0 ].legs[ 0 ];
              
              if (friendstartMarker != undefined) {
                // Marker already created - Move it
                friendstartMarker.setPosition(leg.start_location);
              }
              else {
                // Marker does not exist - Create it
                friendstartMarker = new google.maps.Marker({
                  position: leg.start_location,
                  map: map,
                  draggable: true,
                  icon: '/images/marker.png'
                });
              }
              if (friendDestinationMarker != undefined) {
                // Marker already created - Move it
                friendDestinationMarker.setPosition(leg.end_location);
              } else {
                // Marker does not exist - Create it
                friendDestinationMarker = new google.maps.Marker({
                  position: leg.end_location,
                  map: map,
                  draggable: true,
                  icon: '/images/marker.png'
                });
              }



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
      var url = "api/"+user+"/locations"
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

  function startTrack() {
      navigator.geolocation.getCurrentPosition(function(position) {  
        var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                              position.coords.longitude);

        // console.log(position.coords.latitude,position.coords.longitude);

        // var myPostion = position.coords.latitude+" "+position.coords.longitude

        socketMassage.actualLat = position.coords.latitude;
        socketMassage.actualLong = position.coords.longitude;

        socket.emit('chat message', socketMassage);
        //socket.broadcast.emit('friend location', position.coords.longitude);
        //friendMarker
        if (marker != undefined) {
          // Marker already created - Move it
          marker.setPosition(newPoint);
        }
        else {
          // Marker does not exist - Create it
          marker = new google.maps.Marker({
            position: newPoint,
            map: map,
            draggable: true,
            icon: '/images/study.png'
          });
        }

        var infoWindow = new google.maps.InfoWindow({
          content: 'Me'
        });

        // Opens the InfoWindow when marker is clicked.
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });

        // Center the map on the new position
        map.setCenter();
      }); 


      // Call the autoUpdate() function every 5 seconds
      setTimeout(startTrack, 5000);

  };

  function startTrackMyFriend() {

      if ($("#friendLat").val() == "") {
          alert("Sorry not online, go have a beer ...")
      } else {
          trackMyFriend();
      }
  };


  function trackMyFriend() {
      navigator.geolocation.getCurrentPosition(function(position) {  

        var newPoint = new google.maps.LatLng($("#friendLat").val(), 
                                              $("#friendLong").val());

          if (friendMarker != undefined) {
            // Marker already created - Move it
            friendMarker.setPosition(newPoint);
          }
          else {
            // Marker does not exist - Create it
            friendMarker = new google.maps.Marker({
              position: newPoint,
              map: map,
              draggable: true,
              icon: '/images/Maradona.png'
            });
          };

          var infoWindow = new google.maps.InfoWindow({
            content: 'My Friend'
          });

          // Opens the InfoWindow when marker is clicked.
          friendMarker.addListener('click', function() {
            infoWindow.open(map, friendMarker);
          });

          // Center the map on the new position
          map.setCenter();
        }); 

        if ($("#friendDestLat").val() == "") {
          console.log("friend has no dest yet");
        } else {
          console.log("friend has dest");
          
          //$("#friendDestLat").val("");
          //$("#friendDestLong").val("");
        }
        
        // // Call the autoUpdate() function every 5 seconds

        setTimeout(startTrackMyFriend, 5000);
  };
  
});//END OF DOCUMENT READY
//================================================================

