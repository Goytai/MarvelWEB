import styled from 'styled-components';

export const Container = styled.div`
  min-width: 15rem;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  height: min-content;
  background: red;

  color: black;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  h2 {
    max-width: 20rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    text-align: justify;
    max-width: 20rem;
    font-size: 0.9rem;
  }
`;
