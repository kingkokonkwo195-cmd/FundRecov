import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Button, Section, PageTitle, Text, FlexContainer } from '../components/StyledComponents';
import InfiniteReviewsList from '../components/InfiniteReviewsList';
import theme from '../utils/theme';
import piCoinLogo from '../assets/pi-coin-logo.svg';

const HeroSection = styled(Section)`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.white};
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
`;

const FeatureCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.medium};
  text-align: center;
  transition: transform ${theme.transitions.medium};
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.md};
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${theme.colors.primary};
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${theme.spacing.sm};
`;

const CtaSection = styled(Section)`
  background-color: ${theme.colors.background};
  text-align: center;
`;

const PiLogo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: ${theme.spacing.md};
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <Container>
          <PiLogo src={piCoinLogo} alt="Pi Coin Logo" />
          <HeroTitle>Welcome to PiNets</HeroTitle>
          <HeroSubtitle>
            The premier platform for managing and selling your Pi Coin
          </HeroSubtitle>
          <FlexContainer justify="center" gap={theme.spacing.md}>
            <Button as={Link} to="/register">
              Register Now
            </Button>
            <Button as={Link} to="/login" variant="secondary">
              Login
            </Button>
          </FlexContainer>
        </Container>
      </HeroSection>
      
      <Section>
        <Container>
          <PageTitle>Why Choose PiNets?</PageTitle>
          <FlexContainer gap={theme.spacing.lg} wrap="wrap">
            <FeatureCard>
              <FeatureIcon>💰</FeatureIcon>
              <FeatureTitle>Best Pi Coin Price</FeatureTitle>
              <Text>
                We offer $2 per Pi Coin, which is the best rate available in the market.
              </Text>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Secure Storage</FeatureTitle>
              <Text>
                Your Pi Coin passphrase is highly encrypted and stored securely.
              </Text>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Instant Transactions</FeatureTitle>
              <Text>
                Sell your Pi Coin and receive payment instantly to your account.
              </Text>
            </FeatureCard>
          </FlexContainer>
        </Container>
      </Section>
      
      <Container>
        <InfiniteReviewsList />
      </Container>
      
      <CtaSection>
        <Container>
          <PageTitle>Ready to Sell Your Pi Coin?</PageTitle>
          <Text>
            Join thousands of happy customers who have already sold their Pi Coin at the best price.
          </Text>
          <Button as={Link} to="/register" style={{ marginTop: theme.spacing.lg }}>
            Get Started Now
          </Button>
        </Container>
      </CtaSection>
    </>
  );
};

export default Home;