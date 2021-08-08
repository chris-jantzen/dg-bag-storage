import React, { useState } from 'react';
// import { login } from '../../../services/authService';
import { handleChange } from '../../utils/utils';
import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import authService from '../../services/authService';
import { useRedirect } from '../../hooks/Redirect';
import { useAuth } from '../../store/contexts/authContext';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const redirect = useRedirect();
  const auth = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await authService.login(username, password);
    console.log(success);
    if (success) {
      setUsername('');
      setPassword('');
      auth.authenticate(true);
      redirect('/home');
    } else {
      auth.authenticate(false);
      // TODO: Some kind of error message in the form
    }
  };

  return (
    <Flex justify='center' pt='6'>
      <Flex direction='column' w='45%' border='1px solid #ccc' p='8' borderRadius='xl'>
        <Heading fontSize='3xl'>Log In</Heading>
        <form onSubmit={onSubmit}>
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

export default Login;
