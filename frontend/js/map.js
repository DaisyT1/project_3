$(function(){

  var markers = [];
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var address;
  var myLocation;

  var canvas = document.getElementById("map-canvas");

  var mapOptions = {
    zoom:12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(canvas , mapOptions);

//   directionsDisplay.setMap(map);
//   directionsDisplay.setPanel(document.getElementById('direction-panel'));

//   var control = document.getElementById('locations-panel');
//   // control.style.display = 'block';
//   // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
//   //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//   // Create the search box and link it to the UI element.
//   var input = document.getElementById('pac-input');
//   var searchBox = new google.maps.places.SearchBox(input);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener('bounds_changed', function() {
//     searchBox.setBounds(map.getBounds());
//   });

  
//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener('places_changed', function() {
//     var places = searchBox.getPlaces();

//     if (places.length == 0) {
//       return;
//     }

//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];

//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };

//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));

//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//       getLocationFromLatLng(place.geometry.location.lat(),place.geometry.location.lng());
//       console.log(place.geometry.location.lat(),place.geometry.location.lng());
//     });

//     map.fitBounds(bounds);
//   });

//   function getMyLocation() {
//       navigator.geolocation.getCurrentPosition(function(position){

//         var latlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);

//         var marker = new google.maps.Marker({
//             position: latlng,
//             map: map,
//             icon: './images/marker.png'
//         });

//       });
//   }

//   function getLocationFromLatLng(lat,lng) {
//         $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +" ,"+lng+"&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q", 
//           function(location){
//              //console.log(location.results[0].formatted_address);
//              //consoleLocation(location.results[0].formatted_address);
//              myLocation = location.results[0].formatted_address;
//     });
//   }

//   // var onChangeHandler = function() {
//   //   calculateAndDisplayRoute(directionsService, directionsDisplay);
//   // };
//   // document.getElementById('start').addEventListener('change', onChangeHandler);
//   // document.getElementById('end').addEventListener('change', onChangeHandler);
  
//   function getDirections() {
//     calculateAndDisplayRoute(directionsService, directionsDisplay);
//   };

//   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//     var start = document.getElementById('start').value;
//     var end = document.getElementById('end').value;
//     directionsService.route({
//       origin: start,
//       destination: end,
//       travelMode: google.maps.TravelMode.DRIVING
//     }, function(response, status) {
//       if (status === google.maps.DirectionsStatus.OK) {
//         directionsDisplay.setDirections(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });
//   }

//   function consoleLocation(location) {
//     console.log(location);
//   }

//   function startTrack() {
//       navigator.geolocation.getCurrentPosition(function(position) {  
//         var newPoint = new google.maps.LatLng(position.coords.latitude, 
//                                               position.coords.longitude);

//         console.log(position.coords);

//         if (typeof io === 'undefined') {
//             return; // socket.io not loaded
//         }
//         var socket = io.connect();
//         socket.on('position.coords', function (data) {
//             console.log('arrived', data);
//             $(document).trigger('new-coordinate', data);
//             // or just directly update your map ...
//         });

//         if (marker) {
//           // Marker already created - Move it
//           marker.setPosition(newPoint);
//         }
//         else {
//           // Marker does not exist - Create it
//           var marker = new google.maps.Marker({
//             position: newPoint,
//             map: map,
//             icon: '/images/marker.png'
//           });
//         }

//         var infoWindow = new google.maps.InfoWindow({
//           content: 'Me'
//         });

//         // Opens the InfoWindow when marker is clicked.
//         marker.addListener('click', function() {
//           infoWindow.open(map, marker);
//         });

//         // Center the map on the new position
//         map.setCenter(newPoint);
//       }); 


//       // Call the autoUpdate() function every 5 seconds
//       setTimeout(startTrack, 5000);

//   };
  
//   // function getLocaFromAdress(adress) {

//   //           console.log("https://maps.googleapis.com/maps/api/geocode/json?address="+adress+"&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q");

//   //         //   $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adress+"&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q", 
//   //         //     function(location){
//   //         //       console.log(location.results[0].geometry.location);

//   //         // });        
//   // }
//   // getLocaFromAdress(80+Hanbury+St,+E15JL,+London);

//   // function getLocaFromPostCode(lat,lng) {
//   //     $("#getLocaFromPostCode").click(function(){     
//   //         $.get("https://maps.googleapis.com/maps/api/geocode/json?address=SE13SA,+London&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q", 
//   //           function(location){
//   //             //return location; 
//   //             console.log(location.results[0].geometry.location);
//   //             console.log(location.results);
//   //             //Object {lat: 51.520138, lng: -0.0703134}

//   //             map.setCenter( location.results[0].geometry.location );
//   //             var marker = new google.maps.Marker( {
//   //                 map     : map,
//   //                 position: location.results[0].geometry.location
//   //             } );
//   //       });
//   //     });
//   // }
//   // function clearMarkers() {
//   //   for (var i = 0; i < markers.length; i++) {
//   //     markers[i].setMap(null);
//   //   }

//   // }

//   // $(document).ready(function() {
//   //   $("#register").submit(function(event){
     
//   //        event.preventDefault();  
//   //         console.log("test");
          
//   //   });
//   // });

//   $("#getDirections").click(function(){
//       getDirections();
//   });

//   $("#savedAdress").click(function(){
//       console.log(address);
//   });

//   $("#startTrack").click(function(){
//       startTrack();
//   });
  
//   $("#clearMarkers").click(function(){
//       clearMarkers();
//   });

//   $("#getLocation").click(function(){
//       // navigator.geolocation.getCurrentPosition(function(position){

//       //   // console.log(position.coords.latitude);
//       //   // console.log(position.coords.longitude);
//       //   getLocationFromLatLng(position.coords.latitude,position.coords.longitude);
//       //   console.log(myLocation);
        
//       //   myLocation = myLocation.replace(", Reino Unido", "");

//       //   console.log(myLocation);
//       //   $('#start')
//       //            .append($("<option></option>")
//       //             .attr("value",myLocation)
//       //             .text("My location")); 

//       // });
//       getMyLocation();
//   });

//   $("#getLocaFromAdress").click(function(){     
//       $.get("https://maps.googleapis.com/maps/api/geocode/json?address=80+Hanbury+St,+E15JL,+London&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q", 
//         function(location){
//           //return location; 
//           console.log(location.results[0].geometry.location);
//           //Object {lat: 51.520138, lng: -0.0703134}

//           map.setCenter( location.results[0].geometry.location );
//           var marker = new google.maps.Marker( {
//               map     : map,
//               position: location.results[0].geometry.location
//           } );
//     });
//   });
  
//   $("#getLocaFromPostCode").click(function(){     
//       $.get("https://maps.googleapis.com/maps/api/geocode/json?address=SE13SA,+London&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q", 
//         function(location){
//           //return location; 
//           console.log(location.results[0].geometry.location);
//           console.log(location.results);
//           //Object {lat: 51.520138, lng: -0.0703134}

//           map.setCenter( location.results[0].geometry.location );
//           var marker = new google.maps.Marker( {
//               map     : map,
//               position: location.results[0].geometry.location
//           } );
//     });
//   });

//   $("#getLocaFromLatLon").click(function(){
//       $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=51.501552,-0.0875484&key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q", 
//         function(location){
//           address = location.results[0].formatted_address;
//           //console.log(location.results[0].formatted_address);
//       });
//   });

});