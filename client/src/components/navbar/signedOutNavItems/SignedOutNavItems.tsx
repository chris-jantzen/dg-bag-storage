import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutNavItems = () => {
  return (
    <>
      <li>
        <Link to='#'>Sign Up</Link>
      </li>
      <li>
        <Link to='#'>Log In</Link>
      </li>
    </>
  );
};

export default SignedOutNavItems;
