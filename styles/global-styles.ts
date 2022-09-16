import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle` 
 ${normalize} 

 @font-face {
  font-family: "Poppins";
  src: url("./fonts/Poppins-Medium.ttf");
  font-weight:400;
 }
*{
  box-sizing: border-box;

}
  html {    
    box-sizing: border-box;   
    font-family: Poppins;
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
