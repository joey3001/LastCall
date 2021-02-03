import ApiClient from './ApiClient.js';
import $ from 'jquery';

export default class BreweryFunctions {

  //Filters a list of all organizations that sell alcohol in a given state to a list of only breweries/brewpubs. 
  static breweryStateFilter(alcoholSalesListByState) {

    return alcoholSalesListByState.filter(
      (brewery) => brewery.status === "Brewpub" || brewery.status === "Brewery"
    );
  }

  //Calculates the distance between the currently indexed brewery & the user's address. 
  static async breweryDistanceCalculator(indexedBrewery, userCoords, stateName) {

    const breweryMapQuestApiResponse = await ApiClient.addressCoords(indexedBrewery.street.replace(/ /g,"+"), indexedBrewery.city.replace(/ /g,"+"), stateName, indexedBrewery.zip); 
    const breweryLatLng = breweryMapQuestApiResponse.results[0].locations[0].displayLatLng;
    const deltaLng = (breweryLatLng.lng - userCoords.lng);
    const deltaLat = (breweryLatLng.lat - userCoords.lat);
    const distance = 69 * Math.sqrt(Math.pow(deltaLng, 2) + Math.pow(deltaLat, 2));
    indexedBrewery.distance = distance; 
    return indexedBrewery;
  }

  //Filters breweries that are within the user's specified search Radius. 
  static async breweryDistanceFilter(breweryListByState, userAddressLatLng, stateNameReformatted, searchRadius) { 
    console.log(breweryListByState);
    for (let i = 0; i < breweryListByState.length; i++) {
      breweryListByState[i] = await BreweryFunctions.breweryDistanceCalculator(breweryListByState[i], userAddressLatLng, stateNameReformatted);
    }

    return breweryListByState.filter(
      (brewery) => brewery.distance <= searchRadius
    );
  }

  //Sorts breweries from least to most distant from the user's address
  static breweryDistanceSorter(breweriesFilteredByDistance) {

    return breweriesFilteredByDistance.sort(
      (a,b) => a.distance - b.distance
    );
  }

  //Posts to the DOM breweries within the user's specified search Radius & sorted from least to most distant from the user's address. 
  static breweryPost(sortedBreweriesByDistance, selector) {

    $(selector).text("");
    for (let i = 0; i < sortedBreweriesByDistance.length ; i++) {
      $(selector).append('<li class=' + 'postTop' + '>' + sortedBreweriesByDistance[i].name + '</li>');
      $(selector).append('<ul class=' + 'post' + '>Distance: ' + sortedBreweriesByDistance[i].distance.toFixed(1) + ' Miles</ul>');
      $(selector).append('<ul class=' + 'post' + '>Address: ' + sortedBreweriesByDistance[i].street + ', ' + sortedBreweriesByDistance[i].city + ', ' + sortedBreweriesByDistance[i].zip + '</ul>');
      $(selector).append('<ul class=' + 'postBottom' + '>Website: <a href=https://www.' + sortedBreweriesByDistance[i].url.toString() + '>' + sortedBreweriesByDistance[i].url + '</a></ul>');
    }
  }
}