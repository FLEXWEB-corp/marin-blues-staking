import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle` 
 ${normalize} 
 @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

*{
  box-sizing: border-box;
  /* font-family: inherit; */
  font-family: 'Poppins', sans-serif;
}
  body {
    font-family: 'Poppins', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    color: inherit;
  }

  p{
    margin:0px;
  } 


    a { cursor: pointer; text-decoration: none; }
    
`;
