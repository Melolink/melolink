import React, { useState } from 'react';

interface Props {
  initial?: {
    fullName?: string;
    email?: string;
    phone?: string;
    instrument?: string;
    experience?: string;
  };
  onSave?: (data: any) => void;
}

export default function UserSettings({ initial = {}, onSave }: Props) {
  const [form, setForm] = useState({
    fullName: initial.fullName || '',
    email: initial.email || '',
    phone: initial.phone || '',
    instrument: initial.instrument || '',
    experience: initial.experience || '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    // In a real app you'd call an API here. For now we call onSave and show a message.
    onSave?.(form);
    setMessage('Profile updated successfully');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Full name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Instrument</label>
          <input name="instrument" value={form.instrument} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Experience</label>
          <select name="experience" value={form.experience} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600">New password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Confirm password</label>
          <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save changes</button>
          {message && <p className="text-sm text-green-600">{message}</p>}
        </div>
      </form>
    </div>
  );
}
