import {BreweryService} from './BreweryService.js';
import $ from 'jquery';

export default async function breweryPost(breweryListPerState, stateName2, userDist, selector, userAddressLatLng) {
  let breweryResult = [];
  let breweryLatLng = [];
  for (let i = 0; i < breweryListPerState.length; i++) {
    let response3 = await BreweryService.addressCoords("", breweryListPerState[i].street.replace(/ /g,"+"), breweryListPerState[i].city.replace(/ /g,"+"), stateName2, breweryListPerState[i].zip); 
    let nameDist = {
      distance: null,
      name: null,
      website: null,
      street: null,
      city: null,
      zip: null,
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
    if(i === breweryListPerState.length-1) {
      for (let j = 0; j < breweryResult.length ; j++) { 
        $(selector).append('<li><strong>' + breweryResult[j].name.name + '</strong></li>');
        $(selector).append('<ul>Address: ' + breweryResult[j].name.street + ', ' + breweryResult[j].name.city + ', ' + breweryResult[j].name.zip + '</ul>');
        // $(selector).append('<ul>' + breweryResult[j].name.city + '</ul>');
        // $(selector).append('<ul>' + breweryResult[j].name.zip + '</ul>')
        $(selector).append('<ul>Website: <a href="' + breweryResult[j].name.url + '">' + breweryResult[j].name.url + '</a></ul>');
      }
    }
  }
}