import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(287.56deg, #3a71cf 0%, #244d94 100%);

  section {
    max-width: 80rem;
    margin-inline: auto;

    display: flex;

    img {
      width: 31.25rem;
      height: 37.5rem;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    main {
      padding: 0 3rem;
      display: flex;
      flex-direction: column;

      h2 {
        font-size: 2rem;
        text-shadow: 0 0 5px rgb(0, 0, 0);
        margin-bottom: 2rem;
      }

      p {
        text-align: justify;
        font-size: 1.2rem;
      }

      button {
        align-self: flex-end;
        margin-top: auto;
        padding: 1.5rem 2rem;
        cursor: pointer;

        background: #244d94;
        border: none;
        border-radius: 0.625rem;

        font-family: 'Inter';
        font-size: 1.2rem;
        font-weight: 600;
        color: white;

        display: flex;

        svg {
          fill: red;
          margin-left: 1rem;
        }
      }
    }
  }
`;
