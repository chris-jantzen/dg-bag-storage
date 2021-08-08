import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
// import { signup } from '../../../services/authService';
import { handleChange } from '../../utils/utils';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
    // signup(username, password);
  };

  return (
    <Flex justify='center' pt='6'>
      <Flex direction='column' w='45%' border='1px solid #ccc' p='8' borderRadius='xl'>
        <Heading fontSize='3xl'>Signup</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl my='4' isRequired>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              type='text'
              name='username'
              id='username'
              onChange={handleChange(setUsername)}
            />
          </FormControl>
          <FormControl mb='4' isRequired>
            <label htmlFor='password'>Password</label>
            <Input
              type='text'
              name='password'
              id='password'
              onChange={handleChange(setPassword)}
            />
          </FormControl>
          <Button type='submit' background='primary.300' color='white'>
            Submit
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Signup;
