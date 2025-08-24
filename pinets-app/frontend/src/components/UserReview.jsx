import React from 'react';
import styled from 'styled-components';
import { Card } from './StyledComponents';
import theme from '../utils/theme';

const ReviewCard = styled(Card)`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  transition: transform ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.round};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const UserName = styled.h4`
  margin: 0 0 ${theme.spacing.xs};
  color: ${theme.colors.text};
`;

const ReviewText = styled.p`
  margin: 0;
  color: ${theme.colors.lightText};
`;

const ReviewDate = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.lightText};
`;

const AmountSold = styled.div`
  font-weight: bold;
  color: ${theme.colors.success};
`;

const UserReview = ({ user }) => {
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <ReviewCard>
      <UserAvatar>{getInitials(user.name)}</UserAvatar>
      <ReviewContent>
        <UserName>{user.name}</UserName>
        <ReviewText>"{user.review}"</ReviewText>
        <ReviewDate>{user.date}</ReviewDate>
      </ReviewContent>
      <AmountSold>
        Sold {user.amountSold} Pi
      </AmountSold>
    </ReviewCard>
  );
};

export default UserReview;