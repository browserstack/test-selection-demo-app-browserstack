import React, { useImperativeHandle, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Profile: React.FC = () => {
  const { user, login, logout } = useUser();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
    birthdate: user?.birthdate || '',
    gender: user?.gender || '',
    company: user?.company || '',
    website: user?.website || ''
  });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(email, email);
    setLoading(false);
    if (!success) setError('User not found. Try another email.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Update user context and localStorage
    Object.assign(user!, form);
    localStorage.setItem('user', JSON.stringify(user));
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2"
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {error && <EmptyState message={error} className="text-red-500 text-sm" />}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
        <div className="text-gray-600 mb-2">{user.email}</div>
        <div className="text-gray-600 mb-2">@{user.username}</div>
        {editMode ? (
          <form className="w-full max-w-xs space-y-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full px-3 py-2" />
            <Input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full px-3 py-2" />
            <Input name="birthdate" value={form.birthdate} onChange={handleChange} placeholder="Birthdate" className="w-full px-3 py-2" />
            <Input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="w-full px-3 py-2" />
            <Input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full px-3 py-2" />
            <Input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="w-full px-3 py-2" />
            <div className="flex gap-2 mt-2">
              <Button type="submit" className="bg-blue-600 text-white">Save</Button>
              <Button type="button" variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            {user.phone && <div className="text-gray-600 mb-2">Phone: {user.phone}</div>}
            {user.address && <div className="text-gray-600 mb-2">Address: {user.address}</div>}
            {user.birthdate && <div className="text-gray-600 mb-2">Birthdate: {user.birthdate}</div>}
            {user.gender && <div className="text-gray-600 mb-2">Gender: {user.gender}</div>}
            {user.company && <div className="text-gray-600 mb-2">Company: {user.company}</div>}
            {user.website && <div className="text-blue-600 mb-4"><a href={user.website} target="_blank" rel="noopener noreferrer">Website</a></div>}
            <Button className="bg-blue-600 text-white mb-2" onClick={() => setEditMode(true)}>Edit Profile</Button>
          </>
        )}
        <Button className="bg-red-500 text-white" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default Profile;
