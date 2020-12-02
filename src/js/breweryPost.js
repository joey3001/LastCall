import {BreweryService} from './BreweryService.js';
import $ from 'jquery';

export default async function breweryPost(breweryListPerState, stateName2, userDist, selector, userAddressLatLng) {
  let breweryResult = [];
  let breweryLatLng = [];
  for (let i = 0; i < breweryListPerState.length; i++) {//TODO
    let response3 = await BreweryService.addressCoords("", breweryListPerState[i].street.replace(/ /g,"+"), breweryListPerState[i].city.replace(/ /g,"+"), stateName2, breweryListPerState[i].zip); 
    let nameDist = {
      distance: null,
      name: null,
    }
    breweryLatLng[i] = response3.results[0].locations[0].displayLatLng;
    let dLng = (breweryLatLng[i].lng - userAddressLatLng.lng);
    let dLat = (breweryLatLng[i].lat - userAddressLatLng.lat);
    let distance = 69 * Math.sqrt(Math.pow(dLng, 2) + Math.pow(dLat, 2));
    if (distance <= userDist) {
      nameDist.distance = distance;
      nameDist.name = breweryListPerState[i];
      breweryResult.push(nameDist);
    }
    breweryResult.sort(function(a,b) {
      return a.distance - b.distance;
    });
    console.log(i);
    console.log(breweryListPerState.length);
    if(i === breweryListPerState.length-1) {
      for (let j = 0; j < breweryResult.length ; j++) { 
        $(selector).append('<li>' + breweryResult[j].name.name + '</li>');
      }
    }
  }
}