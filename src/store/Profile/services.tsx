import { API_MAP }  from 'helpers/api';
import { agent } from 'helpers/agent';
class ProfileService {
  static listReview(userId: any) {
    console.log('List Review');
    const filters = `filter[where][userId]=${userId}`;
    return agent.get(`${API_MAP.listReviews}?filter=${filters}`);
  }
  static listWish(userId: any) {
    console.log('List Wish');
    const filters = `filter[where][userId]=${userId}`;
    return agent.get(`${API_MAP.listWishs}?filter=${filters}`);
  }

  static hasReview(userId: any) {
    console.log('user has Review');
    const filters = `where[userId]=${userId}`;
    return agent.get(`${API_MAP.hasReviews}?${filters}`);
  }
  static hasWish(userId: any) {
    console.log('user has Wish');
    const filters = `where[userId]=${userId}`;
    return agent.get(`${API_MAP.hasWishs}?${filters}`);
  }
}
export default ProfileService;
