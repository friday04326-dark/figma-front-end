import React, { useState, useEffect } from 'react';
import { auth, db, getCustomers, Customer } from '../../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AddCustomer from './AddCustomer';

const VendorDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen for login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadCustomers(currentUser.uid);
      } else {
        setUser(null);
        setCustomers([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load customers from Firebase
  const loadCustomers = async (userId: string) => {
    try {
      const q = query(collection(db, 'customers'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const loadedCustomers: Customer[] = [];
      querySnapshot.forEach((doc) => {
        loadedCustomers.push({ id: doc.id, ...doc.data() } as Customer);
      });
      setCustomers(loadedCustomers);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading) return <div style={{ color: 'white', padding: '20px' }}>Loading Dashboard...</div>;
  if (!user) return <div style={{ color: 'white', padding: '20px' }}>Please log in.</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: 'white', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Vendor Dashboard</h1>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setShowAddCustomer(!showAddCustomer)}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: showAddCustomer ? '#6c757d' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          {showAddCustomer ? 'Cancel' : '+ Add New Customer'}
        </button>
        <button style={{ padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Create Work Order
        </button>
        <button style={{ padding: '12px 24px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          View Bills
        </button>
      </div>

      {/* Add Customer Form Section */}
      {showAddCustomer && (
        <div style={{ marginBottom: '40px', animation: 'fadeIn 0.3s ease-in' }}>
          <AddCustomer 
            userId={user.uid} 
            onCustomerAdded={() => {
              setShowAddCustomer(false);
              loadCustomers(user.uid); // Refresh list after adding
            }} 
          />
        </div>
      )}

      {/* Customer List */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
          Your Customers ({customers.length})
        </h2>
        
        {customers.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>No customers added yet. Click "Add New Customer" to start.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr)), gap: '20px' }}>
            {customers.map((customer) => (
              <div key={customer.id} style={{ 
                backgroundColor: '#1e1e1e', 
                padding: '20px', 
                borderRadius: '8px', 
                border: '1px solid #333' 
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#4da6ff' }}>{customer.name}</h3>
                <p style={{ margin: '5px 0', color: '#ccc' }}>📞 {customer.phone}</p>
                {customer.email && <p style={{ margin: '5px 0', color: '#ccc' }}>✉️ {customer.email}</p>}
                {customer.address && <p style={{ margin: '5px 0', color: '#aaa', fontSize: '14px' }}>📍 {customer.address}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
