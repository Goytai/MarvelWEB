import styled from 'styled-components';

import { ReactComponent as logo } from '@images/simpleLogo.svg';

export const Container = styled.header`
  max-width: 80rem;
  height: 6rem;
  margin-inline: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 2rem;

  form {
    min-width: 300px;
    width: 30rem;
    height: 3.5rem;

    input {
      width: 100%;
      height: 100%;

      padding-inline: 2rem;
      background: #244d94;
      border: none;
      border-radius: 0.25rem;

      font-family: 'Roboto';
      font-size: 1rem;
      font-weight: 500;
      color: white;

      &::placeholder {
        color: white;
      }
    }
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    a {
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;

      text-decoration: none;
      font-family: 'Roboto';
      font-size: 1.2rem;
      font-weight: 500;
      color: white;
      padding-inline: 1.0625rem;
    }
  }
`;

export const Logo = styled(logo)`
  width: auto;
  height: 3rem;
`;

export const Avatar = styled.button`
  margin-left: 2rem;
  height: 3rem;
  width: 3rem;
  border-radius: 2rem;
  background: #244d94;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  cursor: pointer;

  svg {
    fill: white;
  }
`;
