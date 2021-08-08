import SignedOutNavItems from './signedOutNavItems/SignedOutNavItems';
import SignedInNavItems from './signedInNavItems/SignedInNavItems';
import { useAuth } from '../../store/contexts/authContext';
import { Flex, Heading, UnorderedList } from '@chakra-ui/react';
import { useRedirect } from '../../hooks/Redirect';

const Navbar = () => {
  const { auth } = useAuth();
  const redirect = useRedirect();
  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      bg='primary.300'
      p='0.25em 1em'
      h='50px'
    >
      <Flex alignItems='center' h='100%'>
        <Heading
          color='white'
          _hover={{ cursor: 'pointer' }}
          fontSize='3xl'
          onClick={() => redirect('/home')}
        >
          Disc Log
        </Heading>
      </Flex>
      <UnorderedList
        display='flex'
        flexDir='row'
        justifyContent='space-between'
        alignItems='center'
        listStyleType='none'
        w={{
          lg: '15%',
          xl: '12%',
        }}
        h='100%'
      >
        {auth?.isAuthenticated ? <SignedInNavItems /> : <SignedOutNavItems />}
      </UnorderedList>
    </Flex>
  );
};

export default Navbar;
