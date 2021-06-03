import styled from 'styled-components';

interface CardProps {
  img: string;
}

export const Container = styled.a<CardProps>`
  height: 30rem;
  border-radius: 0.25rem;

  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url(${props => props.img});
  background-size: cover;

  padding: 1.3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  text-decoration: none;

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
`;
