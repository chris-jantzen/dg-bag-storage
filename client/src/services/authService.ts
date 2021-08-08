import { axios } from '../api';

const baseUrl = axios.defaults.baseURL;
axios.defaults.baseURL = `${baseUrl}/user`;

const signup = async (username: string, password: string): Promise<boolean> => {
  const res = await axios.post(`/signup`, { username, password });
  return res?.data?.success;
};

const login = async (username: string, password: string): Promise<boolean> => {
  const res = await axios.post(`/login`, { username, password });
  return res?.data?.success;
};

const exports = { login, signup };
export default exports;
