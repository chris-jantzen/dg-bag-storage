import { Link } from 'react-router-dom';
import { WelcomeStyles, LoginButtonWrapper, SignupButtonWrapper } from './Welcome.styles';

const Welcome = () => {
  return (
    <WelcomeStyles>
      <h2>Welcome to Disc Log</h2>
      <div className='navButtons'>
        <SignupButtonWrapper>
          <Link to='/signup'>Sign Up</Link>
        </SignupButtonWrapper>
        <LoginButtonWrapper>
          <Link to='/login'>Login</Link>
        </LoginButtonWrapper>
      </div>
    </WelcomeStyles>
  );
};

export default Welcome;
