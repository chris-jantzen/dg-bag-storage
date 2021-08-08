import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import authService from '../../services/authService';
import { handleChange } from '../../utils/utils';
import { useRedirect } from '../../hooks/Redirect';
import { useAuth } from '../../store/contexts/authContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const redirect = useRedirect();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await authService.signup(username, password);
    if (success) {
      setUsername('');
      setPassword('');
      // TODO: Consolidate this into a hook or util?
      auth.authenticate(true);
      redirect('/home');
    } else {
      auth.authenticate(false);
    }
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
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              type='password'
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
