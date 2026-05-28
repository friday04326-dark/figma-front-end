import React, { useState } from 'react';
import { addCustomer } from '../../firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

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
      await addCustomer({
        name,
        phone,
        email,
        address
      }, userId);
      
      setMessage({ type: 'success', text: 'Customer saved successfully!' });
      
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      
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
    <Card className="w-full max-w-md mx-auto bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Customer</CardTitle>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert className={`mb-4 ${message.type === 'success' ? 'bg-green-900/20 border-green-800' : 'bg-red-900/20 border-red-800'}`}>
            <AlertDescription className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              placeholder="e.g. Ramesh Kumar"
              className="bg-input text-input-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              placeholder="e.g. 9876543210"
              className="bg-input text-input-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="e.g. ramesh@example.com"
              className="bg-input text-input-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address / Site Details</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
              placeholder="e.g. Shop No. 5, Main Market, Delhi"
              rows={3}
              className="bg-input text-input-foreground resize-y"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 text-lg font-semibold"
          >
            {loading ? 'Saving...' : 'Save Customer'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCustomer;
