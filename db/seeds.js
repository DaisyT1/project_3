var mongoose = require("mongoose");
var passwordHasher = require('password-hash');
// var bcrypt = require('bcrypt-nodejs');

var databaseURL = 'mongodb://localhost/project3';
mongoose.connect(databaseURL);

var User = require('../models/user');
var Location = require('../models/location');

// LOCATIONS

var loca1 = new Location({
  name: "Second Home",
  address: "68-80 Hanbury St, London E1 5JL",
  lat: 51.520216,
  long: -0.070392,
  private: false
});

loca1.save(function(err, location) {
 if (err) return console.log(err);
 console.log("Location saved", location);
});

var loca2 = new Location({
  name: "Breakfast Club",
  address: "12-16 Artillery Ln, London E1 7LS",
  lat: 51.518344,
  long: -0.078783,
  private: false
});

loca2.save(function(err, location) {
 if (err) return console.log(err);
 console.log("Location saved", location);
});

var loca3 = new Location({
  name: "Buckingham Palace",
  address: "Buckingham Palace Rd, London SW1A 1AA",
  lat: 51.499654,
  long: -0.142426,
  private: false
});

loca3.save(function(err, location) {
 if (err) return console.log(err);
 console.log("Location saved", location);
});

var loca4 = new Location({
  name: "Fabric",
  address: "77A Charterhouse St, London EC1M 6HJ",
  lat: 51.519511, 
  long: -0.102536,
  private: false
});

loca4.save(function(err, location) {
 if (err) return console.log(err);
 console.log("Location saved", location);
});

var loca5 = new Location({
  name: "One Canada Square",
  address: "Canary Wharf Group, London E14 5AB",
  lat: 51.504856, 
  long: -0.019497,
  private: false
});

loca5.save(function(err, location) {
 if (err) return console.log(err);
 console.log("Location saved", location);
});

var loca6 = new Location({
  name: "Crossbones Cemetery",
  address: "Redcross Way, London SE1 1TA",
  lat: 51.503849, 
  long: -0.093516,
  private: false
});

loca6.save(function(err, location) {
 if (err) return console.log(err);
 console.log("Location saved", location);
});

// USER

var user1 = new User({
  name: "Kermit",
    email: "kermit@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca1, loca3, loca4],
    friend_requests: [],
    friends: [user2, user4, user7],
    friends_requested: [],
    admin: true,
    image: "",
    current_dest: { lat: null, long: null}
});

user1.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});

var user2 = new User({
  name: "Miss Piggy",
    email: "piggy@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca2, loca3, loca5],
    friend_requests: [],
    friends: [user1],
    friends_requested: [user3],
    admin: true,
    image: "",
    current_dest: { lat: null, long: null}
});

user2.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});

var user3 = new User({
  name: "Fozzie",
    email: "fozzie@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca4, loca6, loca3],
    friend_requests: [user1],
    friends: [user4],
    friends_requested: [],
    admin: true,
    image: "",
    current_dest: { lat: null, long: null}
});

user3.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});

var user4 = new User({
  name: "Gonzo",
    email: "gonzo@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca1, loca4, loca6],
    friend_requests: [user5],
    friends: [user3, user1],
    friends_requested: [],
    admin: false,
    image: "",
    current_dest: { lat: null, long: null}
});

user4.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});

var user5 = new User({
  name: "Elmo",
    email: "elmo@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca2, loca5],
    friend_requests: [],
    friends: [user6],
    friends_requested: [user4],
    admin: false,
    image: "",
    current_dest: { lat: null, long: null}
});

user5.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});

var user6 = new User({
  name: "Rowlf",
    email: "rowlf@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca1, loca2, loca3],
    friend_requests: [],
    friends: [user5],
    friends_requested: [],
    admin: false,
    image: "",
    current_dest: { lat: null, long: null}
});

user6.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});

var user7 = new User({
  name: "Dr Teeth",
    email: "drteeth@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca4, loca5, loca6],
    friend_requests: [],
    friends: [user1],
    friends_requested: [],
    admin: false,
    image: "",
    current_dest: { lat: null, long: null}
});

user7.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});

var user8 = new User({
  name: "Rizzo",
    email: "rizzo@muppets.com",
    passwordHash: passwordHasher.generate('123qwe'),
    locations: [loca2, loca4, loca6],
    friend_requests: [],
    friends: [],
    friends_requested: [],
    admin: false,
    image: "",
    current_dest: { lat: null, long: null}
});

user8.save(function(err, user) {
 if (err) return console.log(err);
 console.log("User saved", user);
});
