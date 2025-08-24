import React from 'react';
import styled from 'styled-components';
import { Container, FlexContainer, SmallText } from './StyledComponents';
import theme from '../utils/theme';
import piCoinLogo from '../assets/pi-coin-logo.svg';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg} 0;
  margin-top: auto;
`;

const FooterLogo = styled.img`
  height: 30px;
  width: auto;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing.lg};
  }
`;

const FooterTitle = styled.h4`
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.md};
  font-size: 1.2rem;
`;

const FooterLink = styled.a`
  color: ${theme.colors.white};
  opacity: 0.8;
  display: block;
  margin-bottom: ${theme.spacing.sm};
  
  &:hover {
    opacity: 1;
    color: ${theme.colors.white};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Container>
        <FlexContainer wrap="wrap" gap={theme.spacing.xl}>
          <FooterSection>
            <FlexContainer align="center" gap={theme.spacing.sm}>
              <FooterLogo src={piCoinLogo} alt="Pi Coin Logo" />
              <FooterTitle>PiNets</FooterTitle>
            </FlexContainer>
            <SmallText style={{ color: 'white', opacity: 0.8 }}>
              The premier platform for managing and selling your Pi Coin.
            </SmallText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/dashboard">Dashboard</FooterLink>
            <FooterLink href="/login">Login</FooterLink>
            <FooterLink href="/register">Register</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Resources</FooterTitle>
            <FooterLink href="#">Pi Coin Guide</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Support</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Legal</FooterTitle>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </FooterSection>
        </FlexContainer>
        
        <Copyright>
          <SmallText style={{ color: 'white', opacity: 0.8 }}>
            © {currentYear} PiNets. All rights reserved.
          </SmallText>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;