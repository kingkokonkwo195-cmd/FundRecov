import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import SellBanner from './SellBanner';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px 0;
`;

const Layout = ({ children }) => {
  return (
    <PageContainer>
      <SellBanner />
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Layout;