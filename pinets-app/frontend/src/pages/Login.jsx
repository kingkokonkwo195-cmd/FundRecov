import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  PageTitle, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Alert,
  Card,
  SmallText
} from '../components/StyledComponents';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [piPassphrase, setPiPassphrase] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate inputs
    if (!email || !password || !piPassphrase) {
      return setError('All fields are required');
    }
    
    try {
      setLoading(true);
      await login(email, password, piPassphrase);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <PageTitle>Login to Your Account</PageTitle>
      
      <Card>
        <Form onSubmit={handleSubmit}>
          {error && <Alert type="error">{error}</Alert>}
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="piPassphrase">Pi Coin Passphrase</Label>
            <Input
              id="piPassphrase"
              type="password"
              value={piPassphrase}
              onChange={(e) => setPiPassphrase(e.target.value)}
              placeholder="Enter your Pi Coin passphrase"
              required
            />
            <SmallText italic>
              Your Passphrase is highly encrypted and is not visible to anyone.
            </SmallText>
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
          <SmallText style={{ textAlign: 'center', marginTop: '20px' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </SmallText>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;