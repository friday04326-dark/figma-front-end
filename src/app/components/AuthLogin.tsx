import React, { useState } from 'react';
import { loginWithEmail } from '../firebase';

interface AuthLoginProps {
  onLoginSuccess: (user: any) => void;
}

const AuthLogin: React.FC<AuthLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const userCredential = await loginWithEmail(email, password);
      onLoginSuccess(userCredential.user);
    } catch (err: any) {
      setError('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ color: 'white' }}>CCTV Manager Login</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' }}
          placeholder="vendor@example.com"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: 'white' }}
          placeholder="********"
        />
      </div>

      <button 
        onClick={handleLogin} 
        disabled={loading}
        style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      
      <p style={{ color: '#888', fontSize: '12px', marginTop: '15px', textAlign: 'center' }}>
        Use your registered email and password.
      </p>
    </div>
  );
};

export default AuthLogin;
