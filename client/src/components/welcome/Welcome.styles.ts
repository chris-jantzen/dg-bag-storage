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

const WelcomeButton = styled.button`
  width: 20%;
  padding: 0.5em;
  margin-bottom: 0.75rem;
  font-size: 1.25em;
  cursor: pointer;
  border: none;
  border-radius: 10px;
`;

export const LoginButton = styled(WelcomeButton)`
  color: #fff;
  background: rgb(96, 165, 250);

  &:hover {
    background: rgb(30, 64, 175);
  }
`;

export const SignUpButton = styled(WelcomeButton)`
  color: rgb(107, 114, 128);
  background: #fff;

  &:hover {
    background: rgb(156, 163, 175);
  }
`;
