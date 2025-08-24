import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary};
  }
  
  a {
    text-decoration: none;
    color: ${theme.colors.primary};
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.accent};
    }
  }
  
  button {
    cursor: pointer;
    font-family: ${theme.fonts.main};
  }
  
  input, textarea, select {
    font-family: ${theme.fonts.main};
  }
`;

export default GlobalStyles;