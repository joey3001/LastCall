import ApiClient from './ApiClient.js';
import $ from 'jquery';

export default class BreweryInfoByState {

  constructor(alcoholStoreList, userCoords, stateName, searchRadius) {
    this.alcoholStoreList = alcoholStoreList;
    this.userCoords = userCoords; 
    this.stateName = stateName; 
    this.searchRadius = searchRadius; 
    this.breweriesByState;
    this.breweriesWithDistance;
    this.breweriestFilteredByDistance; 
    this.breweriesFilteredAndSortedByDistance; 
  }

  //Filters a list of all stores that sell alcohol in a given state to a list of only breweries/brewpubs. 
  breweryStateFilter() {
    this.breweriesByState = this.alcoholStoreList.filter(
      (brewery) => brewery.status === "Brewpub" || brewery.status === "Brewery"
    );
  }

  //Adds distance key:value pair to brewery objects
  async addDistancetoBreweries() {
    this.breweriesWithDistance = await Promise.all(this.breweriesByState.map(brewery =>  
      BreweryFunctions.breweryDistanceCalculator(brewery, this.userCoords, this.stateName)
    ));
  }

  //Filters breweries that are within the user's specified search radius
  getLocalBreweries() {
    this.breweriesFilteredByDistance = this.breweriesWithDistance.filter(
      (brewery) => brewery.distance <= this.searchRadius
    );
  }

  //Sorts breweries by least to most distant
  sortLocalBreweries() {
    this.breweriesFilteredAndSortedByDistance = this.breweriesFilteredByDistance.sort(
      (a,b) => a.distance - b.distance
    );
  }

  //Posts breweries to a specified selector in the DOM 
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