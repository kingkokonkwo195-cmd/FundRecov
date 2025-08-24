import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Container, 
  PageTitle, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardBody,
  Button,
  FlexContainer,
  Text,
  Alert
} from '../components/StyledComponents';
import InfiniteReviewsList from '../components/InfiniteReviewsList';
import { useAuth } from '../context/AuthContext';
import theme from '../utils/theme';

const DashboardContainer = styled(Container)`
  padding-top: ${theme.spacing.xl};
`;

const WalletCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.lg};
`;

const WalletHeader = styled(CardHeader)`
  border-bottom-color: rgba(255, 255, 255, 0.2);
`;

const WalletTitle = styled(CardTitle)`
  color: ${theme.colors.white};
`;

const BalanceAmount = styled.h2`
  font-size: 2.5rem;
  margin: ${theme.spacing.md} 0;
  color: ${theme.colors.white};
`;

const BalanceLabel = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
`;

const BalanceValue = styled.span`
  font-weight: bold;
`;

const SellButton = styled(Button)`
  background-color: #FFD700; /* Gold color */
  color: ${theme.colors.accent};
  border: none;
  font-weight: 700;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  
  &:hover {
    background-color: #FFC107;
    color: ${theme.colors.accent};
  }
`;

const ActivityCard = styled(Card)`
  margin-bottom: ${theme.spacing.lg};
`;

const ActivityItem = styled.div`
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityDate = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.lightText};
`;

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellSuccess, setSellSuccess] = useState(false);
  
  // Simulate fetching user data
  useEffect(() => {
    // This would be an API call in a real application
    const fetchUserData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setBalance(Math.floor(Math.random() * 10000) + 1000);
        
        // Mock activity data
        const mockActivities = [
          { id: 1, type: 'Deposit', amount: 500, date: '2025-08-15' },
          { id: 2, type: 'Withdrawal', amount: 200, date: '2025-08-10' },
          { id: 3, type: 'Deposit', amount: 1000, date: '2025-08-05' },
          { id: 4, type: 'Withdrawal', amount: 150, date: '2025-07-28' },
          { id: 5, type: 'Deposit', amount: 300, date: '2025-07-20' }
        ];
        
        setActivities(mockActivities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleSellPiCoin = () => {
    // This would be an API call in a real application
    setSellSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSellSuccess(false);
    }, 5000);
  };
  
  if (loading) {
    return (
      <DashboardContainer>
        <PageTitle>Loading your dashboard...</PageTitle>
      </DashboardContainer>
    );
  }
  
  return (
    <DashboardContainer>
      <PageTitle>Welcome to Your Dashboard</PageTitle>
      
      {sellSuccess && (
        <Alert type="success">
          Your request to sell Pi Coin has been received! Our team will contact you shortly.
        </Alert>
      )}
      
      <WalletCard>
        <WalletHeader>
          <WalletTitle>Your Pi Coin Wallet</WalletTitle>
        </WalletHeader>
        <CardBody>
          <BalanceLabel>Current Balance</BalanceLabel>
          <BalanceAmount>{balance.toLocaleString()} π</BalanceAmount>
          <BalanceLabel>
            Estimated Value: <BalanceValue>${(balance * 2).toLocaleString()}</BalanceValue>
          </BalanceLabel>
          
          <FlexContainer justify="center" style={{ marginTop: theme.spacing.lg }}>
            <SellButton onClick={handleSellPiCoin}>
              Sell Your Pi Coin Now for $2 Each
            </SellButton>
          </FlexContainer>
        </CardBody>
      </WalletCard>
      
      <ActivityCard>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardBody>
          {activities.length > 0 ? (
            activities.map(activity => (
              <ActivityItem key={activity.id}>
                <FlexContainer justify="space-between">
                  <div>
                    <Text style={{ margin: 0 }}>
                      {activity.type}: {activity.amount} π
                    </Text>
                    <ActivityDate>{activity.date}</ActivityDate>
                  </div>
                  <Text style={{ margin: 0, fontWeight: 'bold' }}>
                    {activity.type === 'Deposit' ? '+' : '-'}${activity.amount * 2}
                  </Text>
                </FlexContainer>
              </ActivityItem>
            ))
          ) : (
            <Text>No recent activity found.</Text>
          )}
        </CardBody>
      </ActivityCard>
      
      <InfiniteReviewsList />
    </DashboardContainer>
  );
};

export default Dashboard;