import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(287.56deg, #3a71cf 0%, #244d94 100%);
`;

export const Favorites = styled.section`
  max-width: 80rem;
  margin-inline: auto;

  padding-bottom: 2.5rem;

  h2 {
    margin-block: 2.5rem 1rem;
  }

  div {
    display: grid;
    gap: 1rem;

    p {
      width: 45rem;
      font-family: 'Inter';
      font-size: 1.2rem;
    }

    &.characters {
      grid-template-columns: repeat(4, 1fr);
    }

    &.comics {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
