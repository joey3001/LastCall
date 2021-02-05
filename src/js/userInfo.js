import ApiClient from './ApiClient.js';

export default class UserInfo {

  constructor(Street, City, Zip, stateName, stateAbv, searchRadius) {
    //User info for the search/methods
    this.Street = Street; 
    this.City = City; 
    this.Zip = Zip; 
    this.stateName = stateName; 
    this.stateAbv = stateAbv; 
    this.searchRadius = searchRadius;
    this.Coords; 
  }

  //Uses Mapquest API to get latitude & longitude values for the user's address
  async getCoords() {
    const AddressInfo = await ApiClient.addressCoords(this.Street, this.City, this.stateName, this.Zip);
    this.Coords = AddressInfo.results[0].locations[0].displayLatLng;
  }
}