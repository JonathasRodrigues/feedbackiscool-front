import { API } from 'settings';

export const API_MAP = {
  login: `${API}/Users/login`,
  profile: `${API}/profile`,
  register: `${API}/Users`,
  recover: ``,
  changePassword: ``,
  listCities: `${API}/Cities`,
  listSchools: `${API}/Schools`,
  insertSchool: `${API}/Schools`,
  findSchoolById: `${API}/Schools/{id}`,
  listReviews: `${API}/Reviews`,
  insertReview: `${API}/Reviews`,
  insertProspect: `${API}/Prospects`,
  findReviewById: `${API}/Reviews/{id}`,
  listWishs: `${API}/Prospects`,
  hasWishs: `${API}/Prospects/count`,
  hasReviews: `${API}/Reviews/count`,
 };