import { API_MAP }  from 'helpers/api';
import { agent } from 'helpers/agent';
class SchoolService {
  static list(id?: any) {
    console.log('List Schools');
    console.log(id);
    if (id) {
    const filter = `filter[where][cityId]=${id}`;
    return agent.get(`${API_MAP.listSchools}?${filter}`);
    } else {
      return agent.get(`${API_MAP.listSchools}`);
    }
  }
  static insert(school: any) {
    return agent.post(`${API_MAP.insertSchool}`, school);
  }

  static findById(id?: any) {
    return agent.get(`${API_MAP.findSchoolById}`.replace('{id}', id));
  }
}
export default SchoolService;
