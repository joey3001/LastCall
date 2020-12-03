export class BreweryService {
  static async findBrewery(state) {
    try { 
      const response = await fetch (`http://beermapping.com/webservice/locstate/${process.env.API_KEY}/${state}&s=json`);
      if (!response.ok) {
        throw Error(response.statusText); 
      }
      return response.json();
    } 
    catch(error) {
      return error.message;
    }
  }

  static async addressCoords(compass, street, city, state, zip) {
    try { 
      const response = await fetch (`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.API_KEY2}&street=${street}+${compass}&city=${city}&state=${state}&postalCode=${zip}`);
      if (!response.ok) {
        throw Error(response.statusText); 
      }
      return response.json();
    } 
    catch(error) {
      return error.message;
    }
  }
}
