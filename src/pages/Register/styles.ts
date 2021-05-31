import styled from 'styled-components';
import { lighten } from 'polished';

import BackgroundImage from '@images/thumbnail.jpg';
import { ReactComponent as LogoImg } from '@images/logo.svg';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  background: #0a5aaa;
`;

export const Thumbnail = styled.div`
  flex: 1;

  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-position: 0;
  background-size: auto 100%;
`;

export const Box = styled.div`
  width: 50rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;

    width: 25rem;

    label {
      font-family: 'PT Sans';
      font-weight: 600;
      font-size: 1.4rem;
      & + input {
        margin-top: 0.5rem;
      }
    }

    input {
      height: 3rem;
      border: none;
      border-radius: 0.25rem;
      padding-inline: 2rem;

      font-size: 1rem;

      & + label {
        margin-top: 1.5rem;
      }

      &[type='submit'] {
        margin-top: 2rem;
        background: #0b4075;
        border-radius: 0.625rem;

        font-family: 'Inter';
        font-size: 1.2rem;
        font-weight: 700;
        color: white;

        transition: 0.2s background;

        &:hover {
          background: ${lighten(0.05, '#0B4075')};
        }
      }
    }

    > a {
      margin-left: auto;
      text-decoration: none;
      font-family: 'Roboto';
      font-weight: 700;
      font-size: 1.0625rem;
      margin-top: 1rem;
      color: white;
      float: right;
    }
  }
`;

export const Logo = styled(LogoImg)`
  width: 25rem;
`;
