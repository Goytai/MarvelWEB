import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(287.56deg, #3a71cf 0%, #244d94 100%); ;
`;

const loading = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Main = styled.main`
  position: relative;
  max-width: 80rem;
  margin-inline: auto;

  padding-bottom: 2.5rem;

  h2 {
    margin-block: 2.5rem 1rem;
  }

  div {
    display: grid;
    gap: 1rem;

    &.characters {
      grid-template-columns: repeat(4, 1fr);
    }

    &.comics {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  > svg {
    position: absolute;
    left: 50%;
    animation: 1s;
    transform: translateX(-50%);

    animation: 1s ${loading} linear infinite;
  }
`;
