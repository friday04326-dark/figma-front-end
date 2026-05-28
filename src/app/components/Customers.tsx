import React, { useEffect, useState } from 'react';
import { getCustomers } from '../../firebase';
import { User } from 'firebase/auth';

interface CustomerData {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface CustomersProps {
  currentUser: User | null; // The logged-in user from Firebase
  onRefresh?: () => void; // Optional callback when data refreshes
}

const Customers: React.FC<CustomersProps> = ({ currentUser, onRefresh }) => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch customers from Firebase
  const loadCustomers = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      // We use the user's UID to only fetch their own customers
      const data = await getCustomers(currentUser.uid);
      setCustomers(data);
      if (onRefresh) onRefresh();
    } catch (err: any) {
      setError('Failed to load customers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts or user changes
  useEffect(() => {
    loadCustomers();
  }, [currentUser]);

  if (loading) {
    return (
      <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
        Loading customers...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>My Customers</h2>
      
      {error && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#fee2e2', 
          color: '#991b1b', 
          borderRadius: '6px', 
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}

      {customers.length === 0 ? (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          backgroundColor: '#1e1e1e', 
          borderRadius: '8px',
          color: '#aaa'
        }}>
          No customers found. Add your first customer!
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {customers.map((customer) => (
            <div 
              key={customer.id} 
              style={{ 
                backgroundColor: '#2c2c2c', 
                padding: '20px', 
                borderRadius: '8px', 
                border: '1px solid #444',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#60a5fa' }}>
                {customer.name}
              </h3>
              
              <div style={{ marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>
                <strong>Phone:</strong> {customer.phone}
              </div>
              
              {customer.email && (
                <div style={{ marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>
                  <strong>Email:</strong> {customer.email}
                </div>
              )}
              
              {customer.address && (
                <div style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.4' }}>
                  <strong>Address:</strong><br/>
                  {customer.address}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
