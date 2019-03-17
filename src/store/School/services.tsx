import { API_MAP }  from 'helpers/api';
import { agent } from 'helpers/agent';
class SchoolService {
  static list(id?: any) {
    console.log('List Schools');
    if (id) {
    const filter = `filter[where][cityId]=${id}&filter[order]=name%20ASC`;
    return agent.get(`${API_MAP.listSchools}?${filter}`);
    } else {
      let filters = `%7B%20%22order%22%3A%20%22name%22%20%20%7D`;
      return agent.get(`${API_MAP.listSchools}?filter=${filters}`);
    }
  }
  static insert(school: any) {
    return agent.post(`${API_MAP.insertSchool}`, school);
  }

  static findById(id?: any) {
    return agent.get(`${API_MAP.findSchoolById}`.replace('{id}', id));
  }
  static totalSchools() {
    return agent.get(`${API_MAP.totalSchools}`);
  }
}
export default SchoolService;
