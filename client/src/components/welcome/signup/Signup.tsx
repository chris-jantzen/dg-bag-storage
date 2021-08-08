import { Flex, FormControl, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';
// import { signup } from '../../../services/authService';
import { handleChange } from '../../../utils/utils';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
    // signup(username, password);
  };

  // Todo
  return (
    <Flex>
      <h2>Signup</h2>
      <FormControl>
        <div className='username'>
          <FormLabel htmlFor='username'>Username</FormLabel>
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
      </FormControl>
    </Flex>
  );
};

export default Signup;
