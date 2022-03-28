import { ListItem, Link } from '@chakra-ui/react';
import { useRedirect } from '../../../hooks/Redirect';

const SignedOutNavItems = () => {
  const redirect = useRedirect();
  return (
    <>
      <ListItem color='white' fontSize='lg'>
        <Link onClick={() => redirect('/signup')} p='0.35em 0.5em' borderRadius='lg' _hover={{ background: '#4797f9' }}>
          Sign Up
        </Link>
      </ListItem>
      <ListItem color='white' fontSize='lg'>
        <Link onClick={() => redirect('/login')} p='0.35em 0.5em' borderRadius='lg' _hover={{ background: '#4797f9' }}>
          Log In
        </Link>
      </ListItem>
    </>
  );
};

export default SignedOutNavItems;
