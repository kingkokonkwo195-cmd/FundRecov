import styled from 'styled-components';
import theme from '../utils/theme';

// Container components
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => props.gap || '0'};
`;

// Form components
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.text};
`;

export const Input = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  font-size: 16px;
  transition: border-color ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
  }
`;

export const TextArea = styled.textarea`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
  }
`;

// Button components
export const Button = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${props => props.variant === 'secondary' ? theme.colors.white : theme.colors.primary};
  color: ${props => props.variant === 'secondary' ? theme.colors.primary : theme.colors.white};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.medium};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.variant === 'secondary' ? theme.colors.background : theme.colors.accent};
    border-color: ${props => props.variant === 'secondary' ? theme.colors.primary : theme.colors.accent};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Card components
export const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.small};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.spacing.sm};
`;

export const CardTitle = styled.h3`
  margin: 0;
`;

export const CardBody = styled.div``;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
  padding-top: ${theme.spacing.sm};
`;

// Alert components
export const Alert = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: ${theme.spacing.md};
  background-color: ${props => {
    switch(props.type) {
      case 'success': return 'rgba(76, 175, 80, 0.1)';
      case 'error': return 'rgba(244, 67, 54, 0.1)';
      case 'warning': return 'rgba(255, 193, 7, 0.1)';
      case 'info':
      default: return 'rgba(33, 150, 243, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info':
      default: return theme.colors.info;
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info':
      default: return theme.colors.info;
    }
  }};
`;

// Banner component
export const Banner = styled.div`
  background-color: ${theme.colors.accent};
  color: ${theme.colors.white};
  padding: ${theme.spacing.md};
  text-align: center;
  font-weight: bold;
  width: 100%;
`;

// Section components
export const Section = styled.section`
  padding: ${theme.spacing.xl} 0;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

// Grid components
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${props => props.minWidth || '250px'}, 1fr));
  gap: ${props => props.gap || theme.spacing.md};
`;

// Typography
export const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: ${theme.spacing.md};
`;

export const Text = styled.p`
  margin-bottom: ${theme.spacing.md};
  line-height: 1.6;
`;

export const SmallText = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.lightText};
  font-style: ${props => props.italic ? 'italic' : 'normal'};
`;

// Divider
export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: ${theme.colors.border};
  margin: ${theme.spacing.md} 0;
`;