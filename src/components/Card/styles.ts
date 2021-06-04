import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface CardProps {
  img: string;
  type: string;
}

export const Container = styled(Link)<CardProps>`
  /* height: 30rem; */
  border-radius: 0.25rem;

  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(${props => props.img});
  background-size: cover;

  padding: 1.3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  text-decoration: none;

  ${props =>
    props.type === 'characters' &&
    css`
      height: 15rem;
    `}

  ${props =>
    props.type === 'comics' &&
    css`
      height: 27.1875rem;
    `}

  /* &:hover {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      ),
      url(${props => props.img});
    background-size: cover;
  } */

  h4 {
    color: white;
    line-height: 1.5rem;
    width: 90%;
    max-width: 200px;
    height: 1.5rem;
    font-size: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  svg {
    fill: #d63230;
  }

  button {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 3rem;
    height: 2rem;

    background: 0;
    border: 0;
    cursor: pointer;
  }
`;
