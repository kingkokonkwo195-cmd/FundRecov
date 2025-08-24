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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [piPassphrase, setPiPassphrase] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate inputs
    if (!email || !password || !confirmPassword || !piPassphrase) {
      return setError('All fields are required');
    }
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    try {
      setLoading(true);
      await register(email, password, piPassphrase);
      setSuccess(true);
      
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <PageTitle>Create Your PiNets Account</PageTitle>
      
      <Card>
        {success ? (
          <Alert type="success">
            Registration successful! Redirecting to login...
          </Alert>
        ) : (
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
                placeholder="Create a password"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
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
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
            
            <SmallText style={{ textAlign: 'center', marginTop: '20px' }}>
              Already have an account? <Link to="/login">Login</Link>
            </SmallText>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default Register;