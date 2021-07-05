import styled from 'styled-components';

export const NavbarStyles = styled.nav`
  margin: 0;
  padding: 0.25em 1em;
  background: rgb(96, 165, 250);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  a {
    cursor: pointer;
    text-decoration: none;
  }

  h1 {
    font-size: 1.75em;
    margin: 0.5em 0;
    color: #fff;
  }
`;

export const NavListStyles = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 15%;

  li {
    color: #fff;
  }

  li a {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    padding: 0.35em 0.5em;
    border-radius: 4px;
  }

  a:hover {
    background: rgb(37, 99, 235);
  }
`;
