import React, { useState } from 'react';
import { loginWithEmail } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface AuthLoginProps {
  onLoginSuccess: (userId: string, role: string) => void;
}

const AuthLogin: React.FC<AuthLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Login with Firebase Auth
      const userCredential = await loginWithEmail(email, password);
      const user = userCredential.user;

      // 2. Fetch user role from Firestore 'users' collection
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let role = 'user'; // Default role
      if (userDocSnap.exists()) {
        role = userDocSnap.data().role || 'user';
      } else {
        // If no user doc exists, create one (for testing purposes)
        // In production, you'd want an admin to create users
        role = 'vendor'; 
      }

      // 3. Pass ID and Role to the main App
      onLoginSuccess(user.uid, role);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#121212', 
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '30px', 
        backgroundColor: '#1e1e1e', 
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#2563eb' }}>CCTV Manager</h2>
        
        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#991b1b', 
            padding: '12px', 
            borderRadius: '6px', 
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="admin@cctv.com"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '6px', 
                border: '1px solid #444', 
                backgroundColor: '#2c2c2c', 
                color: 'white',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#aaa' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••••"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '6px', 
                border: '1px solid #444', 
                backgroundColor: '#2c2c2c', 
                color: 'white',
                boxSizing: 'border-box'
              }}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#666' }}>
          Use your registered email and password.
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
