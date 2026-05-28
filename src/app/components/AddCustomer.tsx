import React, { useState } from 'react';
import { addCustomer } from '../../firebase'; // Points to src/firebase.ts

interface AddCustomerProps {
  userId: string;
  onCustomerAdded: () => void;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ userId, onCustomerAdded }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      setMessage({ type: 'error', text: 'Name and Phone are required!' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Call the Firebase function we created earlier
      await addCustomer({
        name,
        phone,
        email,
        address
      }, userId);
      
      setMessage({ type: 'success', text: 'Customer saved successfully!' });
      
      // Clear form
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      
      // Tell the parent component to refresh the list
      setTimeout(() => {
        setMessage(null);
        onCustomerAdded();
      }, 2000);
      
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save customer' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: '#1e1e1e', 
      borderRadius: '12px', 
      color: 'white',
      maxWidth: '500px',
      margin: '0 auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>Add New Customer</h2>
      
      {message && (
        <div style={{ 
          padding: '12px', 
          borderRadius: '6px', 
          marginBottom: '16px',
          backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: message.type === 'success' ? '#065f46' : '#991b1b'
        }}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="e.g. Ramesh Kumar"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white', boxSizing: 'border-box' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Phone Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            placeholder="e.g. 9876543210"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white', boxSizing: 'border-box' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Email (Optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="e.g. ramesh@example.com"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white', boxSizing: 'border-box' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Address / Site Details</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
            placeholder="e.g. Shop No. 5, Main Market, Delhi"
            rows={3}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '14px', 
            backgroundColor: loading ? '#555' : '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            marginTop: '8px'
          }}
        >
          {loading ? 'Saving...' : 'Save Customer'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
