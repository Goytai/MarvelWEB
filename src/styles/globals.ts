import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    color: white;
    -webkit-font-smooth: antialiased;
  }
`;
