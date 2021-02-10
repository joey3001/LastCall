import ApiClient from './ApiClient.js';
import $ from 'jquery';

export default class BrewerySearchInfo {

  constructor(user) {
    //User info for the search/methods
    this.user = user; 

    //Brewery info populated by the search/methods
    this.alcoholStoreListt;
    this.breweriesByState;
    this.breweriesWithDistance;
    this.breweriestFilteredByDistance; 
    this.breweriesFilteredAndSortedByDistance; 
  }

  //Uses BeerMapping API to get a list of all stores that sell alcohol in the user's state
  async getAlcoholStoreList() {
    this.alcoholStoreList = await ApiClient.alcoholStoreList(this.user.stateAbv); 
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
      this.breweryDistanceCalculator(brewery)
    ));
  }

  //Filters breweries that are within the user's specified search radius
  getLocalBreweries() {
    this.breweriesFilteredByDistance = this.breweriesWithDistance.filter(
      (brewery) => brewery.distance <= this.user.searchRadius
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
    if (this.breweriesFilteredAndSortedByDistance.length) {
      let post = ''; 
      for (let i = 0; i < this.breweriesFilteredAndSortedByDistance.length; i++) {
        let brewery = this.breweriesFilteredAndSortedByDistance[i];
        post += '<li class=' + 'postTop' + '>' + brewery.name + '</li>' + '<li class=' + 'post' + '>Distance: ' + brewery.distance.toFixed(1) + ' Miles</li>' + '<li class=' + 'post' + '>Address: <a href=https://www.google.com/maps/dir/?api=1&origin=' + this.user.street + '+' + this.user.city + "+" + "+" + this.user.stateName + "+" + this.user.zip + '&destination=' + brewery.street.replace(/\s/g, '+') + '+' + brewery.city + '+' + this.user.stateName + '+' + brewery.zip + '>' + brewery.street + ', ' + brewery.city + ', ' + brewery.zip + '</a></li>' + '<li class=' + 'post' + '>Website: <a href=https://www.' + brewery.url.toString() + '>' + brewery.url + '</a></li>' + '<div class=' + 'bottomBorderPost' + '></div>'
      }
      console.log(post); 
      $(post).hide().appendTo(selector).fadeIn();
    } 
    else {
      $(selector).append('<li class=' + 'postTopCenter' + '>' + 'Your search returned no results. Try expanding your search radius.' + '</li>');
    }
  }

  //Calculates the distance between the currently indexed brewery & the user's address. 
  async breweryDistanceCalculator(indexedBrewery) {
    const breweryMapQuestApiResponse = await ApiClient.addressCoords(indexedBrewery.street.replace(/ /g,"+"), indexedBrewery.city.replace(/ /g,"+"), this.user.stateName, indexedBrewery.zip); 
    const breweryLatLng = breweryMapQuestApiResponse.results[0].locations[0].displayLatLng;
    const deltaLng = (breweryLatLng.lng - this.user.coords.lng);
    const deltaLat = (breweryLatLng.lat - this.user.coords.lat);
    const distance = 69 * Math.sqrt(Math.pow(deltaLng, 2) + Math.pow(deltaLat, 2));
    indexedBrewery.distance = distance; 
    return indexedBrewery;
  }
}