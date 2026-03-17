import API from '../api/axios';

export const register = (username, email, password) => {
  return API.post('/auth/signup', { username, email, password });
};

export const login = (username, password) => {
  return API.post('/auth/signin', { username, password });
};
