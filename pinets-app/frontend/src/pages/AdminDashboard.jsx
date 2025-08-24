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
  Alert,
  Input,
  FormGroup,
  Label,
  Form
} from '../components/StyledComponents';
import theme from '../utils/theme';

const AdminContainer = styled(Container)`
  padding-top: ${theme.spacing.xl};
`;

const UserCard = styled(Card)`
  margin-bottom: ${theme.spacing.md};
`;

const UserHeader = styled(CardHeader)`
  background-color: ${theme.colors.background};
`;

const PassphraseContainer = styled.div`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.small};
  margin: ${theme.spacing.sm} 0;
  position: relative;
`;

const PassphraseText = styled.div`
  font-family: monospace;
  word-break: break-all;
`;

const CopyButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 4px 8px;
  font-size: 0.8rem;
`;

const ActionButton = styled(Button)`
  margin-right: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: 0.9rem;
`;

const SearchBar = styled(Input)`
  margin-bottom: ${theme.spacing.lg};
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
`;

const Tab = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${props => props.active ? theme.colors.white : theme.colors.text};
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${props => props.active ? theme.colors.primary : theme.colors.background};
  }
`;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    piPassphrase: '',
    balance: 0
  });
  
  // Simulate fetching users data
  useEffect(() => {
    // This would be an API call in a real application
    const fetchUsers = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockUsers = [
          { 
            id: 1, 
            email: 'user1@example.com', 
            piPassphrase: 'correct horse battery staple random words here',
            balance: 5000,
            createdAt: '2025-08-10'
          },
          { 
            id: 2, 
            email: 'user2@example.com', 
            piPassphrase: 'another secure passphrase with multiple words',
            balance: 2500,
            createdAt: '2025-08-12'
          },
          { 
            id: 3, 
            email: 'user3@example.com', 
            piPassphrase: 'this is a very secure and long passphrase example',
            balance: 7800,
            createdAt: '2025-08-15'
          },
          { 
            id: 4, 
            email: 'user4@example.com', 
            piPassphrase: 'random words make secure passphrases for wallets',
            balance: 1200,
            createdAt: '2025-08-18'
          },
          { 
            id: 5, 
            email: 'user5@example.com', 
            piPassphrase: 'blockchain wallet security requires good passphrases',
            balance: 9500,
            createdAt: '2025-08-20'
          }
        ];
        
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users data:', error);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.piPassphrase.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);
  
  const handleCopyPassphrase = (passphrase) => {
    navigator.clipboard.writeText(passphrase);
    showNotification('Passphrase copied to clipboard!', 'success');
  };
  
  const handleDeleteUser = (userId) => {
    // This would be an API call in a real application
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    showNotification('User deleted successfully!', 'success');
  };
  
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      password: '',
      piPassphrase: user.piPassphrase,
      balance: user.balance
    });
    setShowAddUserForm(true);
  };
  
  const handleAddNewUser = () => {
    setEditingUser(null);
    setFormData({
      email: '',
      password: '',
      piPassphrase: '',
      balance: 0
    });
    setShowAddUserForm(true);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'balance' ? Number(value) : value
    }));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // This would be an API call in a real application
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => {
        if (user.id === editingUser.id) {
          return {
            ...user,
            email: formData.email,
            piPassphrase: formData.piPassphrase,
            balance: formData.balance
          };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      showNotification('User updated successfully!', 'success');
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        email: formData.email,
        piPassphrase: formData.piPassphrase,
        balance: formData.balance,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, newUser]);
      showNotification('New user added successfully!', 'success');
    }
    
    setShowAddUserForm(false);
  };
  
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  if (loading) {
    return (
      <AdminContainer>
        <PageTitle>Loading admin dashboard...</PageTitle>
      </AdminContainer>
    );
  }
  
  return (
    <AdminContainer>
      <PageTitle>Admin Dashboard</PageTitle>
      
      {notification && (
        <Alert type={notification.type}>
          {notification.message}
        </Alert>
      )}
      
      <TabContainer>
        <Tab 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </Tab>
        <Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </Tab>
      </TabContainer>
      
      {activeTab === 'users' && (
        <>
          <FlexContainer justify="space-between" align="center" style={{ marginBottom: theme.spacing.md }}>
            <SearchBar 
              type="text" 
              placeholder="Search users by email or passphrase..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Button onClick={handleAddNewUser}>
              Add New User
            </Button>
          </FlexContainer>
          
          {showAddUserForm && (
            <Card style={{ marginBottom: theme.spacing.lg }}>
              <CardHeader>
                <CardTitle>{editingUser ? 'Edit User' : 'Add New User'}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                  
                  {!editingUser && (
                    <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        required={!editingUser}
                      />
                    </FormGroup>
                  )}
                  
                  <FormGroup>
                    <Label htmlFor="piPassphrase">Pi Coin Passphrase</Label>
                    <Input
                      id="piPassphrase"
                      name="piPassphrase"
                      type="text"
                      value={formData.piPassphrase}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="balance">Pi Coin Balance</Label>
                    <Input
                      id="balance"
                      name="balance"
                      type="number"
                      value={formData.balance}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                  
                  <FlexContainer gap={theme.spacing.md}>
                    <Button type="submit">
                      {editingUser ? 'Update User' : 'Add User'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => setShowAddUserForm(false)}
                    >
                      Cancel
                    </Button>
                  </FlexContainer>
                </Form>
              </CardBody>
            </Card>
          )}
          
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <UserCard key={user.id}>
                <UserHeader>
                  <CardTitle>{user.email}</CardTitle>
                </UserHeader>
                <CardBody>
                  <Text>
                    <strong>User ID:</strong> {user.id}
                  </Text>
                  <Text>
                    <strong>Registered:</strong> {user.createdAt}
                  </Text>
                  <Text>
                    <strong>Balance:</strong> {user.balance.toLocaleString()} π (${(user.balance * 2).toLocaleString()})
                  </Text>
                  
                  <Text>
                    <strong>Pi Coin Passphrase:</strong>
                  </Text>
                  <PassphraseContainer>
                    <PassphraseText>
                      {user.piPassphrase}
                    </PassphraseText>
                    <CopyButton onClick={() => handleCopyPassphrase(user.piPassphrase)}>
                      Copy
                    </CopyButton>
                  </PassphraseContainer>
                  
                  <FlexContainer style={{ marginTop: theme.spacing.md }}>
                    <ActionButton onClick={() => handleEditUser(user)}>
                      Edit User
                    </ActionButton>
                    <ActionButton 
                      style={{ backgroundColor: theme.colors.error }}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete User
                    </ActionButton>
                  </FlexContainer>
                </CardBody>
              </UserCard>
            ))
          ) : (
            <Text>No users found matching your search.</Text>
          )}
        </>
      )}
      
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Settings</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="adminEmail">Admin Email Notifications</Label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@pinets.com"
                placeholder="Email for notifications"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Email Notification Settings</Label>
              <div style={{ marginTop: theme.spacing.xs }}>
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing.xs }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ marginLeft: theme.spacing.xs }}>New user registrations</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing.xs }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ marginLeft: theme.spacing.xs }}>Pi Coin sell requests</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ marginLeft: theme.spacing.xs }}>Security alerts</span>
                </label>
              </div>
            </FormGroup>
            
            <Button style={{ marginTop: theme.spacing.md }}>
              Save Settings
            </Button>
          </CardBody>
        </Card>
      )}
    </AdminContainer>
  );
};

export default AdminDashboard;