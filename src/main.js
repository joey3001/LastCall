import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';
let breweryLatLng = [];
let userAddressLatLng = [];
let breweryListPerState = [];
let breweryResult = {
  breweryList: [],
  breweryDistance: [],
};
//let promise2;

$(document).ready(function() {
  $('#breweryInput').submit(async function() {
    event.preventDefault();
    let compass = $('#compass').val();
    let street = $('#street').val().replace(/ /g,"+");
    let city = $('#city').val().replace(/ /g,"+");
    let stateArr = $('#state').val().split(', ');
    let stateAbv = stateArr[0];
    let stateName = stateArr[1];
    let stateName2 = stateName.replace(/ /g,"+");
    let zip = $('#zip').val().replace(/ /g,"+");
    console.log(stateAbv);
    BreweryService.addressCoords(compass, street, city, stateName2, zip)
      .then(async function(response) {
        userAddressLatLng = response.results[0].locations[0].displayLatLng;
        BreweryService.findBrewery(stateAbv) 
        .then(async function(response) {
          breweryListPerState = response;
          console.log(breweryListPerState);
          for (let i = 0; i < 5 ; i++) { //TODO
            BreweryService.addressCoords("", response[i].street.replace(/ /g,"+"), response[i].city.replace(/ /g,"+"),stateName2, response[i].zip)
            .then(function(response) {    
              breweryLatLng[i] = response.results[0].locations[0].displayLatLng;
              let dLng = (breweryLatLng[i].lng - userAddressLatLng.lng);
              console.log('i is ' + i)
              console.log('breweryLatLng[i].lng = ' + breweryLatLng[i].lng);
              console.log('userLatLng.lng = ' + userAddressLatLng.lng);
              let dLat = (breweryLatLng[i].lat - userAddressLatLng.lat);
              console.log('breweryLatLng[i].lat = ' + breweryLatLng[i].lat);
              console.log('userLatLng.lat = ' +userAddressLatLng.lat);
              let distance = 69 * Math.sqrt(Math.pow(dLng, 2) + Math.pow(dLat, 2));
              // let a = Math.pow(Math.sin(dLat/2), 2) + Math.cos(userAddressLatLng.lat) * Math.cos(breweryLatLng[i].lng) * Math.pow((Math.sin(dLng/2)), 2)
              // let c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
              // let distance = 3961 * c; 
              console.log('distance = ' + distance);
              breweryResult.breweryList.push(breweryListPerState[i])
              breweryResult.breweryDistance.push(response.results[0].locations[0].displayLatLng);
              console.log('result =  ');
              console.log(breweryResult);
              // if (Math.abs(dLat) <= 0.5 && Math.abs(dLng) <= 0.5) {
              //   breweryResult.breweryList.push(breweryListPerState[i])
              //   breweryResult.breweryDistance.push(distance)
              // }
              console.log(breweryLatLng);
            })
          }
        });
        // console.log(userAddressLatLng);
        // console.log(breweryListPerState);
        // console.log(breweryResult.breweryList);
        // console.log(breweryResult);
      });
    });
});



        // for (let i = 0; i < 5; i++) {
        //   console.log('here');
        //   console.log(Math.abs(breweryLatLng[i].lat - userAddressLatLng.lat))
        //   if (Math.abs(breweryLatLng[i].lat - userAddressLatLng.lat) <= 1 && Math.abs(breweryLatLng[i].lng - userAddressLatLng.lng) <= 1) {
        //     breweryResult.push(breweryListPerState[i]);
        //   }
        // }



    //   await promise2;
    //   for (let i = 0; i < breweryListPerState.length; i++) {
    //   console.log('here');
    //   console.log(Math.abs(breweryLatLng[i].lat - userAddressLatLng.lat))
    //   if (Math.abs(breweryLatLng[i].lat - userAddressLatLng.lat) <= 1 && Math.abs(breweryLatLng[i].lng - userAddressLatLng.lng) <= 1) {
    //     breweryResult.push(breweryListPerState[i]);
    //   }
    // } 
    //     }
    //   });
    // await promise;
    // console.log(breweryLatLng.length)
    // console.log(breweryResult)
    // console.log(breweryLatLng);
    // console.log(userAddressLatLng);
    // console.log(breweryListPerState);
    // console.log(breweryListPerState.length)