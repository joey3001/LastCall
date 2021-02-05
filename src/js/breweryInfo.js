import ApiClient from './ApiClient.js';
import $ from 'jquery';

export default class BreweryInfo {

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
  filterAlcoholStoresByBreweries() {
    this.breweriesByState = this.alcoholStoreList.filter(
      (brewery) => brewery.status === "Brewpub" || brewery.status === "Brewery"
    );
  }

  //Adds distance key:value pair to brewery objects
  async addDistancetoBreweries() {
    this.breweriesWithDistance = await Promise.all(this.breweriesByState.map(brewery =>  
      BreweryInfo.breweryDistanceCalculator(brewery, this.userCoords, this.stateName)
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
  async postLocalBreweries(selector, userStreet, userCity, userZip) {
    $(selector).text("");
    if (this.breweriesFilteredAndSortedByDistance.length) {
      for (let i = 0; i < this.breweriesFilteredAndSortedByDistance.length; i++) {
        let brewery = this.breweriesFilteredAndSortedByDistance[i];
        $('<li class=' + 'postTop' + '>' + brewery.name + '</li>').hide().appendTo(selector).fadeIn(); 
        $('<li class=' + 'post' + '>Distance: ' + brewery.distance.toFixed(1) + ' Miles</li>').hide().appendTo(selector).fadeIn(); 
        $('<li class=' + 'post' + '>Address: <a href=https://www.google.com/maps/dir/?api=1&origin=' + userStreet + '+' + userCity + "+" + "+" + this.stateName + "+" + userZip + '&destination=' + brewery.street.replace(/\s/g, '+') + '+' + brewery.city + '+' + this.stateName + '+' + brewery.zip + '>' + brewery.street + ', ' + brewery.city + ', ' + brewery.zip + '</a></li>').hide().appendTo(selector).fadeIn(); 
        $('<li class=' + 'post' + '>Website: <a href=https://www.' + brewery.url.toString() + '>' + brewery.url + '</a></li>').hide().appendTo(selector).fadeIn();
        $('<div class=' + 'bottomBorderPost' + '></div>').hide().appendTo(selector).fadeIn();  
      }
    } 
    else {
      $(selector).append('<li class=' + 'postTopCenter' + '>' + 'Your search returned no results. Try expanding your search radius.' + '</li>');
    }
  }

  //https://www.google.com/maps/dir/?api=1&origin=Space+Needle+Seattle+WA&destination=Pike+Place+Market+Seattle+WA&travelmode=bicycling

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