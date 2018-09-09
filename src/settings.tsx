export const ENV = (process.env.REACT_APP_ENV || 'production').trim();

export const API_TIMEOUT = Number(process.env.REACT_APP_API_TIMEOUT) || 0;
export const API = (process.env.REACT_APP_API || '').trim();
if (!API) throw new Error('Please provide an API');

export const SENTRY_KEY = (process.env.REACT_APP_SENTRY_KEY || '').trim();

export const IS_DEVELOPMENT = ENV === 'development';
export const SNACKBAR_DEFAULT_TIMEOUT = 5000;
export const GOOGLE_API_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
export const APP_NAME = 'Feedback is cool';
export const FB_URL = 'https://fb.me/feedbackiscool';
export const INST_URL= 'https://instagram.com/feedbackiscool';