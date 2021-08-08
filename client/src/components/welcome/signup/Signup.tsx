import React, { useState } from 'react';
// import { signup } from '../../../services/authService';
import { handleChange } from '../../../utils/utils';
import { SignupWrapper, SignupForm } from './Signup.styles';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
    // signup(username, password);
  };

  return (
    <SignupWrapper>
      <h2>Signup</h2>
      <SignupForm onSubmit={handleSubmit}>
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
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            id='password'
            onChange={handleChange(setPassword)}
          />
        </div>
      </SignupForm>
    </SignupWrapper>
  );
};

export default Signup;
