import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, FlexContainer, Button } from './StyledComponents';
import piCoinLogo from '../assets/pi-coin-logo.svg';
import theme from '../utils/theme';

const HeaderContainer = styled.header`
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.small};
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const LogoText = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-left: ${theme.spacing.sm};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  font-weight: 500;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  // Check if user is logged in
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };
  
  return (
    <HeaderContainer>
      <Container>
        <FlexContainer justify="space-between" align="center">
          <Link to="/">
            <FlexContainer align="center">
              <Logo src={piCoinLogo} alt="Pi Coin Logo" />
              <LogoText>PiNets</LogoText>
            </FlexContainer>
          </Link>
          
          <Nav>
            <NavLink to="/">Home</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <Button onClick={() => navigate('/register')}>Register</Button>
              </>
            )}
          </Nav>
          
          <MobileMenuButton aria-label="Menu">
            ☰
          </MobileMenuButton>
        </FlexContainer>
      </Container>
    </HeaderContainer>
  );
};

export default Header;