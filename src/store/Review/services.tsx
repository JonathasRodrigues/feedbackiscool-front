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

  static findById(id?: any) {
    return agent.get(`${API_MAP.findReviewById}`.replace('{id}', id));
  }
}
export default ReviewService;
