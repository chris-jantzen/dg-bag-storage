import React, { useContext } from 'react';
import { NavbarStyles, NavListStyles } from './Navbar.styles';
import SignedOutNavItems from './signedOutNavItems/SignedOutNavItems';
import SignedInNavItems from './signedInNavItems/SignedInNavItems';
import { AuthContext } from '../../store/contexts/authContext';

const Navbar = () => {
  const { auth } = useContext(AuthContext);
  return (
    <NavbarStyles>
      <h1>Disc Log</h1>
      <NavListStyles>
        {auth.authenticated ? <SignedInNavItems /> : <SignedOutNavItems />}
      </NavListStyles>
    </NavbarStyles>
  );
};

export default Navbar;
