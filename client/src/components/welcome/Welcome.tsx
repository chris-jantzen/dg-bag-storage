import React from 'react';
import { WelcomeStyles, LoginButton, SignUpButton } from './Welcome.styles';

const Welcome = () => {
  return (
    <WelcomeStyles>
      <h2>Welcome to Disc Log</h2>
      <div className='navButtons'>
        <SignUpButton>Sign Up</SignUpButton>
        <LoginButton>Log In</LoginButton>
      </div>
    </WelcomeStyles>
  );
};

export default Welcome;
