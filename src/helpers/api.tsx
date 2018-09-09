import { API } from 'settings';

export const API_MAP = {
  login: `${API}/Users/login`,
  loginFacebook: `${API}/auth/facebook`,
  profile: `${API}/profile`,
  register: ``,
  recover: ``,
  changePassword: ``,
  listCities: `${API}/Cities`,
  listSchools: `${API}/Schools`,
  insertSchool: `${API}/Schools`,
  findSchoolById: `${API}/Schools/{id}`,
  listReviews: `${API}/Reviews`,
  insertReview: `${API}/Reviews`,
  findReviewById: `${API}/Reviews/{id}`,
 };