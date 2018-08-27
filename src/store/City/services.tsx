import { API_MAP }  from 'helpers/api';
import { agent } from 'helpers/agent';
class CityService {
  static list() {
    console.log('List');
    let filters = `%7B%20%22order%22%3A%20%22name%22%20%20%7D`;
    return agent.get(`${API_MAP.listCities}?filter=${filters}`);
  }
}
export default CityService;
