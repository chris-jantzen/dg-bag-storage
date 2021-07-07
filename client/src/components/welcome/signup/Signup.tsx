import React, { useState } from 'react';
import { SignupWrapper, SignupForm } from './Signup.styles';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange =
    (handler: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handler(e.currentTarget.value);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
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
