export default class ApiClient {
  
  static async makeApiRequest(endpoint) {
    try { 
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw Error(response.statusText); 
      }
      return response.json();
    } 
    catch(error) {
      return error.message;
    }
  }

  static async alcoholStoreList(state) {
    return this.makeApiRequest(`https://beermapping.com/webservice/locstate/${process.env.API_KEY}/${state}&s=json`);
  }

  static async addressCoords(street, city, state, zip) {
    return this.makeApiRequest(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.API_KEY2}&street=${street}+&city=${city}&state=${state}&postalCode=${zip}`);
  }
}
