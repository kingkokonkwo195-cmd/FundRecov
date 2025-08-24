import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button, PageTitle, Text } from '../components/StyledComponents';
import theme from '../utils/theme';
import piCoinLogo from '../assets/pi-coin-logo.svg';

const NotFoundContainer = styled(Container)`
  text-align: center;
  padding: ${theme.spacing.xxl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  color: ${theme.colors.primary};
  line-height: 1;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: ${theme.spacing.lg};
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Logo src={piCoinLogo} alt="Pi Coin Logo" />
      <ErrorCode>404</ErrorCode>
      <PageTitle style={{ marginTop: 0 }}>Page Not Found</PageTitle>
      <Text>
        The page you are looking for doesn't exist or has been moved.
      </Text>
      <Button as={Link} to="/" style={{ marginTop: theme.spacing.lg }}>
        Return to Home
      </Button>
    </NotFoundContainer>
  );
};

export default NotFound;