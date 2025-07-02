import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { grantStudent } from '../api/tests';
import { useNotification } from '../contexts/NotificationContext.jsx';

const GrantStudent = () => {
  const [form, setForm] = useState({ uid: '', amount: '' });
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: grantStudent,
    onSuccess: (data) => {
      showNotification('Grant successful!', 'success');
      setForm({ uid: '', amount: '' });
    },
    onError: (err) => {
      showNotification(err?.response?.data?.message || 'Grant failed.', 'error');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.uid || !form.amount) {
      showNotification('Both UID and amount are required.', 'error');
      return;
    }
    if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      showNotification('Amount must be a positive number.', 'error');
      return;
    }
    mutation.mutate({ uid: form.uid, amount: Number(form.amount) });
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Grant Student</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student UID</label>
            <input
              type="text"
              name="uid"
              value={form.uid}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter student UID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter amount"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Granting...' : 'Grant'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GrantStudent; 