import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import VendorDashboard from './VendorDashboard';
import TechDashboard from './TechDashboard';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [userRole, setUserRole] = useState<'vendor' | 'technician' | null>(null);

  useEffect(() => {
    // Listen for login state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            setUserRole('vendor'); // Default to vendor if no role found
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole('vendor');
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#121212', 
        color: 'white' 
      }}>
        Loading...
      </div>
    );
  }

  // If no user is logged in, show Login/Register
  if (!user) {
    return (
      <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
        {showRegister ? (
          <AuthRegister onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <AuthLogin 
            onLoginSuccess={() => {}} 
            onSwitchToRegister={() => setShowRegister(true)} 
          />
        )}
      </div>
    );
  }

  // If user is logged in, show appropriate dashboard
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      {userRole === 'technician' ? (
        <TechDashboard currentUser={user} />
      ) : (
        <VendorDashboard currentUser={user} />
      )}
    </div>
  );
};

export default Dashboard;
