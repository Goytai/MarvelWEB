import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(287.56deg, #3a71cf 0%, #244d94 100%); ;
`;

export const Highlights = styled.section`
  max-width: 80rem;
  margin-inline: auto;
  gap: 1rem;
  display: flex;
  justify-content: space-between;

  a {
    width: 21rem;
  }
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

    grid-template-columns: repeat(6, 1fr);

    a {
      height: 13rem;

      /* flex-direction: column; */
      /* border-radius: 0.25rem;
      overflow: hidden;

      img {
        width: 100%;
      } */
    }
  }
`;
