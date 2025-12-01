import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { userProfiles } from '@/data/userProfiles';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { login } = useUser();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Check credentials against predefined users
    const matchedUser = userProfiles.find(u => u.email === email && u.password === password);
    if (!matchedUser) {
      setIsLoading(false);
      alert('Login failed. Please check your credentials.');
      return;
    }
    const success = await login(matchedUser.userId.toString(), email);
    setIsLoading(false);
    if (success) {
      navigate('/products');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 
              className="text-3xl font-bold text-gray-900 mb-2"
              id="login-title"
            >
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Quick user selector keeps demo credentials handy */}
          <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Quick Select User</label>
                  <select
                    id="user-select"
                    value={selectedUser}
                    onChange={e => {
                      setSelectedUser(e.target.value);
                      const user = userProfiles.find(u => u.email === e.target.value);
                      if (user) {
                        setEmail(user.email);
                        setPassword(user.password);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg mb-4 border border-gray-300 bg-gray-50 font-medium"
                  >
                    <option value="">Choose a test user...</option>
                    {userProfiles.map(u => (
                      <option key={u.email} value={u.email}>{u.email}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Input
                    type="email"
                    id="email-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    id="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:text-blue-700 bg-transparent shadow-none border-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
            <Button
              type="submit"
              id="login-submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
