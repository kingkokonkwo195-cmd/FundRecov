import React from 'react';
import styled from 'styled-components';
import { Container, Button } from './StyledComponents';
import theme from '../utils/theme';

const BannerContainer = styled.div`
  background-color: ${theme.colors.accent};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md} 0;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 99;
`;

const BannerContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const BannerText = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${theme.colors.white};
`;

const HighlightText = styled.span`
  font-weight: 700;
  color: #FFD700; /* Gold color for price */
`;

const SellButton = styled(Button)`
  background-color: #FFD700; /* Gold color */
  color: ${theme.colors.accent};
  border: none;
  font-weight: 700;
  
  &:hover {
    background-color: #FFC107;
    color: ${theme.colors.accent};
  }
`;

const SellBanner = () => {
  return (
    <BannerContainer>
      <Container>
        <BannerContent>
          <BannerText>
            Sell your Pi Coin Now for <HighlightText>$2</HighlightText> per coin!
          </BannerText>
          <SellButton>Sell Now</SellButton>
        </BannerContent>
      </Container>
    </BannerContainer>
  );
};

export default SellBanner;