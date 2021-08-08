import React, { useState } from 'react';
// import { login } from '../../../services/authService';
import { handleChange } from '../../utils/utils';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    // try {
    //   const res = await login(username, password);
    //   console.log(res);
    // } catch (error) {
    //   console.error(error.message);
    // }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={onSubmit}>
        <div className='username'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={handleChange(setUsername)}
          />
        </div>
        <div className='password'>
          <label htmlFor='password'>Username</label>
          <input
            type='text'
            name='password'
            id='password'
            onChange={handleChange(setPassword)}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
