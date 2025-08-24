import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import UserReview from './UserReview';
import { SectionTitle } from './StyledComponents';
import theme from '../utils/theme';

const ReviewsContainer = styled.div`
  margin: ${theme.spacing.xl} 0;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
  color: ${theme.colors.primary};
`;

// Sample review data generator
const generateReviews = (count, startIndex = 0) => {
  const reviews = [];
  const names = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Sophia Davis', 'William Wilson',
    'Olivia Martinez', 'James Taylor', 'Ava Anderson', 'Robert Thomas', 'Isabella Jackson',
    'David White', 'Mia Harris', 'Joseph Martin', 'Charlotte Thompson', 'Thomas Garcia',
    'Amelia Robinson', 'Charles Lewis', 'Harper Walker', 'Daniel Hall', 'Evelyn Allen'
  ];
  
  const reviewTexts = [
    "I just sold my Pi Coin and received the money instantly! So happy with this service!",
    "Couldn't believe how easy it was to sell my Pi Coin. The $2 rate is amazing!",
    "Finally cashed out my Pi Coin after holding for so long. Great experience!",
    "The transaction was smooth and the customer service was excellent. Highly recommend!",
    "Just sold my Pi and the money is already in my account. This is revolutionary!",
    "I was skeptical at first, but PiNets delivered exactly as promised. So happy!",
    "Best decision I made was selling my Pi here. The process was seamless!",
    "Sold my Pi at $2 each - that's way better than any other platform I've seen!",
    "The whole process took less than 5 minutes. I'm definitely coming back to sell more!",
    "I've been holding Pi for years and finally found the perfect place to sell. Thank you PiNets!"
  ];
  
  for (let i = 0; i < count; i++) {
    const index = startIndex + i;
    const randomDays = Math.floor(Math.random() * 30) + 1;
    const date = new Date();
    date.setDate(date.getDate() - randomDays);
    
    reviews.push({
      id: index,
      name: names[Math.floor(Math.random() * names.length)],
      review: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      date: date.toLocaleDateString(),
      amountSold: Math.floor(Math.random() * 1000) + 100
    });
  }
  
  return reviews;
};

const InfiniteReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  
  // Load initial reviews
  useEffect(() => {
    const initialReviews = generateReviews(10);
    setReviews(initialReviews);
  }, []);
  
  // Handle intersection observer for infinite scroll
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [loading]);
  
  // Set up intersection observer
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    
    const observer = new IntersectionObserver(handleObserver, option);
    
    if (loader.current) observer.observe(loader.current);
    
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);
  
  // Load more reviews when page changes
  useEffect(() => {
    const loadMoreReviews = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new reviews
      const newReviews = generateReviews(10, reviews.length);
      
      // Add new reviews to the list
      setReviews(prevReviews => [...prevReviews, ...newReviews]);
      setLoading(false);
    };
    
    if (page > 1) {
      loadMoreReviews();
    }
  }, [page]);
  
  return (
    <ReviewsContainer>
      <SectionTitle>Happy Customers Who Just Sold Their Pi Coin</SectionTitle>
      
      {reviews.map(review => (
        <UserReview key={review.id} user={review} />
      ))}
      
      <div ref={loader}>
        {loading && <LoadingIndicator>Loading more reviews...</LoadingIndicator>}
      </div>
    </ReviewsContainer>
  );
};

export default InfiniteReviewsList;