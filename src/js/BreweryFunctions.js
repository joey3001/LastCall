import ApiCalls from './ApiCalls.js';
import $ from 'jquery';

export default class BreweryFunctions {

  //Filters a list of all organizations that sell alcohol in a given state to a list of only breweries/brewpubs. 
  static breweryStateFilter(alcoholSalesListByState) {

    return alcoholSalesListByState.filter(
      (brewery) => brewery.status === "Brewpub" || brewery.status === "Brewery"
    );
  }

  //Calculates the distance between the currently indexed brewery & the user's address. 
  static async breweryDistanceCalculator(currentIndexedBrewery, userAddressLatLng, stateNameReformatted) {

    const breweryMapQuestApiResponse = await ApiCalls.addressCoords(currentIndexedBrewery.street.replace(/ /g,"+"), currentIndexedBrewery.city.replace(/ /g,"+"), stateNameReformatted, currentIndexedBrewery.zip); 
    const breweryLatLng = breweryMapQuestApiResponse.results[0].locations[0].displayLatLng;
    const deltaLng = (breweryLatLng.lng - userAddressLatLng.lng);
    const deltaLat = (breweryLatLng.lat - userAddressLatLng.lat);
    const distance = 69 * Math.sqrt(Math.pow(deltaLng, 2) + Math.pow(deltaLat, 2));
    return distance;
  }

  //Checks if the currently indexed brewery is within the search radius specified by the user.
  //If the brewery is within the search radius, it is added to an array. 
  static breweryDistanceChecker(distance, searchRadius, currentIndexedBrewery, breweriesFilteredByDistance) {

    if (distance <= searchRadius) {
      const breweryAddition = {
        distance: distance, 
        name: currentIndexedBrewery
      };  
      breweriesFilteredByDistance.push(breweryAddition); 
    }
    return breweriesFilteredByDistance; 
  }

  //Filters breweries that are within the user's specified search Radius. 
  static async breweryDistanceFilter(breweryListByState, userAddressLatLng, stateNameReformatted, searchRadius) { 

    let breweriesFilteredByDistance = [];
    for (let i = 0; i < 5; i++) {
      const distance = await BreweryFunctions.breweryDistanceCalculator(breweryListByState[i], userAddressLatLng, stateNameReformatted);
      breweriesFilteredByDistance = BreweryFunctions.breweryDistanceChecker(distance, searchRadius, breweryListByState[i], breweriesFilteredByDistance);
    }

    return breweriesFilteredByDistance; 
  }

  //Sorts breweries from least to most distant from the user's address
  static breweryDistanceSorter(breweriesFilteredByDistance) {

    return breweriesFilteredByDistance.sort(
      (a,b) => a.distance - b.distance
    );
  }

  //Posts to the DOM breweries within the user's specified search Radius & sorted from least to most distant from the user's address. 
  // static breweryPost(sortedBreweriesByDistance, selector) {

  //   $(selector).text("");
  //   for (let i = 0; i < sortedBreweriesByDistance.length ; i++) {
  //     $(selector).append('<li class=' + 'postTop' + '>' + sortedBreweriesByDistance[i].name.name + '</li>');
  //     $(selector).append('<ul class=' + 'post' + '>Distance: ' + sortedBreweriesByDistance[i].distance.toFixed(1) + ' Miles</ul>');
  //     $(selector).append('<ul class=' + 'post' + '>Address: ' + sortedBreweriesByDistance[i].name.street + ', ' + sortedBreweriesByDistance[i].name.city + ', ' + sortedBreweriesByDistance[i].name.zip + '</ul>');
  //     $(selector).append('<ul class=' + 'postBottom' + '>Website: <a href=https://www.' + sortedBreweriesByDistance[i].name.url.toString() + '>' + sortedBreweriesByDistance[i].name.url + '</a></ul>');
  //   }
  //}
}