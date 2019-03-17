import { API_MAP }  from 'helpers/api';
import { agent } from 'helpers/agent';
class ReviewService {
  static list(id?: any) {
    console.log('List Reviews');
    console.log(id);
    if (id) {
    const filter = `filter[where][schoolId]=${id}&filter[order]=created%20DESC`;
    return agent.get(`${API_MAP.listReviews}?${filter}`);
    } else {
      return agent.get(`${API_MAP.listReviews}`);
    }
  }
  static insert(review: any) {
    return agent.post(`${API_MAP.insertReview}`, review);
  }

  static insertProspect(prospect: any) {
    return agent.post(`${API_MAP.insertProspect}`, prospect);
  }

  static findById(id?: any) {
    return agent.get(`${API_MAP.findReviewById}`.replace('{id}', id));
  }

  static totalReviews() {
    return agent.get(`${API_MAP.totalReviews}`);
  }
  static listLast() {
    console.log('List Reviews');
    const filter = `&filter[order]=created%20DESC&filter[limit]=5`;
    return agent.get(`${API_MAP.listReviews}?${filter}`);
  }
}
export default ReviewService;
