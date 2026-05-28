import React, { useState, useEffect } from 'react';
import { auth, db, logout } from '../../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AddCustomer from './AddCustomer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Alert, AlertDescription } from './ui/alert';
import { PlusCircle, Users, Briefcase, LogOut, DollarSign } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: any;
}

const VendorDashboard: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    pendingWorks: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
        fetchCustomers(currentUser.uid);
      } else {
        setUser(null);
        setUserId('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchCustomers = async (uid: string) => {
    try {
      const q = query(collection(db, 'customers'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      const customerList: Customer[] = [];
      querySnapshot.forEach((doc) => {
        customerList.push({ id: doc.id, ...doc.data() } as Customer);
      });
      setCustomers(customerList);
      setStats(prev => ({ ...prev, totalCustomers: customerList.length }));
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'V'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCustomers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Works</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingWorks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={() => setShowAddCustomer(!showAddCustomer)} 
            className="gap-2 py-6 text-lg"
          >
            <PlusCircle className="h-5 w-5" />
            {showAddCustomer ? 'Cancel' : 'Add New Customer'}
          </Button>
        </div>

        {/* Add Customer Form */}
        {showAddCustomer && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <AddCustomer 
              userId={userId} 
              onCustomerAdded={() => {
                setShowAddCustomer(false);
                fetchCustomers(userId);
              }} 
            />
          </div>
        )}

        {/* Customers List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <Alert>
                <AlertDescription className="text-muted-foreground">
                  No customers yet. Click "Add New Customer" to get started!
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div 
                    key={customer.id} 
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                          {customer.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <p className="text-muted-foreground">{customer.phone}</p>
                        {customer.email && (
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VendorDashboard;
