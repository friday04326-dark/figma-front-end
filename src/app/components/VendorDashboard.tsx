import React, { useState, useEffect } from 'react';
import { auth, db, getCustomers, Customer } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where } from 'firebase/firestore';
import AddCustomer from './AddCustomer';

const VendorDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const loadCustomers = async (uid: string) => {
    try {
      // Note: You might need to adjust security rules or query logic if 'userId' field isn't set yet
      // For now, we fetch all and filter client-side if needed, or rely on rules
      const q = query(collection(db, 'customers'), where('userId', '==', uid));
      const data = await getCustomers(uid);
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
      // Fallback: try loading without query if rules block it initially
      setCustomers([]); 
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div style={{color: 'white', padding: 20}}>Loading Dashboard...</div>;
  if (!user) return <div style={{color: 'white', padding: 20}}>Please log in.</div>;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#121212', 
      color: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        borderBottom: '1px solid #333',
        paddingBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>CCTV Vendor Dashboard</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>{user.email}</span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main>
        {/* Action Bar */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowAddCustomer(!showAddCustomer)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {showAddCustomer ? 'Cancel' : '+ Add New Customer'}
          </button>
        </div>

        {/* Add Customer Form Section */}
        {showAddCustomer && (
          <div style={{ marginBottom: '30px', animation: 'fadeIn 0.3s ease-in' }}>
            <AddCustomer 
              userId={user.uid} 
              onCustomerAdded={() => {
                loadCustomers(user.uid);
                setShowAddCustomer(false);
              }} 
            />
          </div>
        )}

        {/* Customer List */}
        <section>
          <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Your Customers</h2>
          
          {customers.length === 0 ? (
            <p style={{ color: '#888', fontStyle: 'italic' }}>No customers added yet. Click "Add New Customer" to start.</p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {customers.map((customer) => (
                <div 
                  key={customer.id} 
                  style={{
                    backgroundColor: '#1e1e1e',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #333'
                  }}
                >
                  <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{customer.name}</h3>
                  <p style={{ margin: '5px 0', color: '#ccc' }}>📞 {customer.phone}</p>
                  {customer.email && <p style={{ margin: '5px 0', color: '#ccc' }}>✉️ {customer.email}</p>}
                  {customer.address && <p style={{ margin: '5px 0', color: '#aaa', fontSize: '0.9em' }}>📍 {customer.address}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default VendorDashboard;
