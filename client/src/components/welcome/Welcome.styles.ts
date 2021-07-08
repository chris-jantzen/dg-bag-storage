import styled from 'styled-components';

export const WelcomeStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 2em;
  }

  .navButtons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;

const WelcomeButtonWrapper = styled.span`
  width: 20%;
  padding: 0.6em;
  margin-bottom: 0.75rem;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  a {
    font-size: 1.25em;
    text-decoration: none;
  }
`;

export const SignupButtonWrapper = styled(WelcomeButtonWrapper)`
  a {
    color: #fff;
  }
  background: #60A5FA;
  &:hover {
    background: #1d7ff8;
  }
`;

export const LoginButtonWrapper = styled(WelcomeButtonWrapper)`
  a {
    color: #6B7280;
  }
  background: #fff;
  border: 2px solid #60A5FA;
  &:hover {
    background: #caced4;

    a {
      color: #333;
    }
  }
`;
