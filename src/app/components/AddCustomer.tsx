import React, { useState } from 'react';
import { addCustomer } from '../../firebase';

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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      setError('Name and Phone are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await addCustomer({
        name,
        phone,
        email,
        address
      }, userId);
      
      setSuccess('Customer added successfully!');
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      
      setTimeout(() => {
        setSuccess('');
        onCustomerAdded();
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#1e1e1e', 
      borderRadius: '8px', 
      color: 'white',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <h3 style={{ marginTop: 0 }}>Add New Customer</h3>
      
      {error && <div style={{ color: '#ff6b6b', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: '#51cf66', marginBottom: '10px' }}>{success}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Full Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white' }}
        />
        
        <input
          type="tel"
          placeholder="Phone Number *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={loading}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white' }}
        />
        
        <input
          type="email"
          placeholder="Email (Optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white' }}
        />
        
        <textarea
          placeholder="Address / Site Details"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={loading}
          rows={3}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: 'white' }}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px', 
            backgroundColor: loading ? '#555' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Saving...' : 'Save Customer'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
