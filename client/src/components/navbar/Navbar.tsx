import { NavbarStyles, NavListStyles } from './Navbar.styles';
import SignedOutNavItems from './signedOutNavItems/SignedOutNavItems';
import SignedInNavItems from './signedInNavItems/SignedInNavItems';
import { useAuth } from '../../store/contexts/authContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { auth } = useAuth();
  return (
    <NavbarStyles>
      <Link to='/bag'>
        <h1>Disc Log</h1>
      </Link>
      <NavListStyles>
        {auth.authenticated ? <SignedInNavItems /> : <SignedOutNavItems />}
      </NavListStyles>
    </NavbarStyles>
  );
};

export default Navbar;
