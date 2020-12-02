export class BreweryService {
  static async findBrewery(state) {
    try { 
      const response = await fetch (`http://beermapping.com/webservice/locstate/9fc31f691baa30b0ee58bcc49747b840/${state}&s=json`);
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
      const response = await fetch (`http://www.mapquestapi.com/geocoding/v1/address?key=W93i9RAAUIOJySGNRJvUGtKJbIEdjTwN&street=${street}+${compass}&city=${city}&state=${state}&postalCode=${zip}`);
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
