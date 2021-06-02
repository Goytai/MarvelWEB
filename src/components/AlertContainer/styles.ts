import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  right: 1rem;
  top: 1rem;

  div + div {
    margin-top: 1rem;
  }
`;
