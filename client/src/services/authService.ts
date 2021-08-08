import axios from 'axios';

export const signup = async (username: string, password: string) => {
  const res = await axios.post('/signup', { username, password });
  console.log(res);
  // return res.data;
};

export const login = async (username: string, password: string) => {
  const res = await axios.post('/login', { username, password });
  console.log(res);
};
