import styled from 'styled-components';

export const NavbarStyles = styled.nav`
  margin: 0;
  padding: 0.25em 1em;
  background: rgb(96, 165, 250);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 2rem;
    margin: 0.5rem 0;
    color: #fff;
  }
`;

export const NavListStyles = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  li {
    color: #fff;
    font-size: 1rem;
  }
`;
