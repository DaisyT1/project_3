![LocaMate logo](https://raw.githubusercontent.com/PatHadley/scratchpad/master/locamate-logo-smiley.png)
>...an app for that moment when you need to meet all your mates at a location that only one person knows...
This app is a demo app designed to help people meet up with friends. It uses the [google maps API] (https://developers.google.com/maps/), MongoDB, Node.js, Express.js and a few other tasty tools!
Give it a go yourself here:
###[Locamate Demo Server - (warning may load slowly!)] (https://nameless-escarpment-28913.herokuapp.com/)
The LocaMate demo was built as a group project on the [General Assembly Web Development Immersive Course] (https://generalassemb.ly/education/web-development-immersive). The team was:
- [Irene Fuentes] (https://github.com/IreneFuentes)
- [Patrick Hadley] (https://github.com/PatHadley)
- [Mishal Shashikant] (https://github.com/mishalmsb)
- [Daisy Tucker] (https://github.com/DaisyT1)
![The LocaMate mainscreen](https://raw.githubusercontent.com/PatHadley/scratchpad/master/locamate-main-screenshot.png)
##Technology used
The apps package.json used:
- body-parser "1.15.1"
- express "4.14.0"
- method-override "2.3.6"
- mongoose "4.5.1"
- jsonwebtoken "5.7.0"
- cors "2.7.1"
- bcrypt-nodejs "0.0.3"
- socket.io "1.4.6"
- morgan "1.7.0"
- password-hash "1.2.2"
External packages used:
- [Google maps API] (https://developers.google.com/maps/) | Map functions
- [Jquery](https://jquery.com/) | Interactivity
- [Bootstrap](http://getbootstrap.com/) | Styling
##Core functionality and user stories
Users must be able to register/login in order to use the app
![The LocaMate mainscreen](https://raw.githubusercontent.com/PatHadley/scratchpad/master/locamate-reg-screenshot.png)
Once the user is logged, the app allows user to do the operations below:
- Search Location:
![The LocaMate mainscreen](https://raw.githubusercontent.com/PatHadley/scratchpad/master/locamate-search-screenshot.png)
        
- Check user current location and see where they are along the journey, also see friend's route display on the map
        (screenshot)
- Access to the friend’s profile and see where is the location to meet up.
        (screenshot)