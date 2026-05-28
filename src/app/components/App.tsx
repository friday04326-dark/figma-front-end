import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase';
import AuthLogin from './AuthLogin';
import VendorDashboard from './VendorDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="text-xl font-semibold animate-pulse">Loading CCTV Manager...</div>
      </div>
    );
  }

  if (!user) {
    // Show Login Screen
    return <AuthLogin />;
  }

  // Show Dashboard if logged in
  return <VendorDashboard user={user} />;
};

export default App;
