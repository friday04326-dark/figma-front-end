import React, { useState } from 'react';
import { loginWithEmail } from '../../firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface AuthLoginProps {
  onLoginSuccess: (userId: string, userEmail: string, role: string) => void;
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
      // Call Firebase login
      const user = await loginWithEmail(email, password);
      
      // Successfully logged in
      // We pass the user UID, email, and a default role (you can refine role logic later)
      onLoginSuccess(user.uid, user.email || '', 'vendor'); 
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-auto bg-card text-card-foreground shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your CCTV business dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 bg-red-900/20 border-red-800">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-input text-input-foreground"
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="bg-input text-input-foreground"
                autoComplete="current-password"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 text-lg font-semibold mt-2"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <p className="text-xs text-center text-muted-foreground mt-6">
            Protected by Firebase Authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLogin;
