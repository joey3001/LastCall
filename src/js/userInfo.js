import ApiClient from './ApiClient.js';

export default class UserInfo {

  constructor(street, city, zip, stateName, stateAbv, searchRadius) {
    //User info for the search/methods
    this.street = street; 
    this.city = city; 
    this.zip = zip; 
    this.stateName = stateName; 
    this.stateAbv = stateAbv; 
    this.searchRadius = searchRadius;
    this.coords; 
  }

  //Uses Mapquest API to get latitude & longitude values for the user's address
  async getCoords() {
    const AddressInfo = await ApiClient.addressCoords(this.street, this.city, this.stateName, this.zip);
    this.coords = AddressInfo.results[0].locations[0].displayLatLng;
  }
}