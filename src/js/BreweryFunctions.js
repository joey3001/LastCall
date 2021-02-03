import ApiClient from './ApiClient.js';
import $ from 'jquery';

export default class BreweryFunctions {

  constructor(alcoholStoreList) {
    this.alcoholStoreList = alcoholStoreList;
    this.breweriesByState;
    this.breweriesWithDistance;
    this.breweriestFilteredByDistance; 
    this.breweriesFilteredAndSortedByDistance; 
  }

  //Filters a list of all organizations that sell alcohol in a given state to a list of only breweries/brewpubs. 
  breweryStateFilter() {
    this.breweriesByState = this.alcoholStoreList.filter(
      (brewery) => brewery.status === "Brewpub" || brewery.status === "Brewery"
    );
  }

  async addDistancetoBreweries(userCoords, stateName) {
    this.breweriesWithDistance = await Promise.all(this.breweriesByState.map(brewery =>  
      BreweryFunctions.breweryDistanceCalculator(brewery, userCoords, stateName)
    ));
  }

  getLocalBreweries(searchRadius) {
    this.breweriesFilteredByDistance = this.breweriesWithDistance.filter(
      (brewery) => brewery.distance <= searchRadius
    );
  }

  sortLocalBreweries() {
    this.breweriesFilteredAndSortedByDistance = this.breweriesFilteredByDistance.sort(
      (a,b) => a.distance - b.distance
    );
  }

  postLocalBreweries(selector) {
    $(selector).text("");
    for(let i = 0; i < this.breweriesFilteredAndSortedByDistance.length; i++) {
      let brewery = this.breweriesFilteredAndSortedByDistance[i];
      $(selector).append('<li class=' + 'postTop' + '>' + brewery.name + '</li>');
      $(selector).append('<ul class=' + 'post' + '>Distance: ' + brewery.distance.toFixed(1) + ' Miles</ul>');
      $(selector).append('<ul class=' + 'post' + '>Address: ' + brewery.street + ', ' + brewery.city + ', ' + brewery.zip + '</ul>');
      $(selector).append('<ul class=' + 'postBottom' + '>Website: <a href=https://www.' + brewery.url.toString() + '>' + brewery.url + '</a></ul>');
    }
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
}