import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
  const history = useHistory();
  const handleClick = (type: string) => () => {
    history.push(type);
  };
  return (
    <Box height='full' pt='2rem'>
      <Flex direction='column' w='100%' alignItems='center'>
        <Heading fontWeight='light' my='2' as='h2'>
          Welcome to Disc Log
        </Heading>
        <Flex w='25%' direction='column'>
          <Button fontSize='xl' bg='primary.300' color='white' onClick={handleClick('/signup')} my='4' py='6'>
            Sign Up
          </Button>
          <Button fontSize='xl' py='6' onClick={handleClick('/login')}>
            Log In
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Welcome;
