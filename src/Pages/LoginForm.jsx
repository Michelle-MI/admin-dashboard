import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [branches, setBranches] = useState([]);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('');

  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (showBranchModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showBranchModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${baseURL}/Auth/API/Account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_X_API_KEY,
          'ApiKey': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          DeviceId: '99b394632358e926',
          UserName: username,
          Password: password,
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (data?.user?.Status === 'SUCCESS') {
        localStorage.setItem('authToken', data.user.Token);
        localStorage.setItem('userName', data.user.UserName);

        if (data.branch && data.branch.length > 0) {
          setBranches(data.branch);
          setShowBranchModal(true);
          setMessage('✅ Login successful! Please select a branch.');
        } else {
          setMessage('❌ No branches found for this user.');
        }
      } else {
        setMessage(data?.user?.Status || '❌ Login failed. Check credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(`⚠️ Server error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchSelect = () => {
    if (!selectedBranch) {
      alert('Please select a branch!');
      return;
    }

    const branchObj = branches.find((b) => b.OurBranchId === selectedBranch);
    localStorage.setItem('selectedBranch', JSON.stringify(branchObj));
    setShowBranchModal(false);

    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '80px' }}>
      <h2 className="text-center mb-4">User Login</h2>

      <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-white">
        <div className="mb-3">
          <label className="form-label fw-bold">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <div className="alert alert-info text-center mt-3">{message}</div>
        )}
      </form>

      {showBranchModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded shadow-lg p-4 w-full max-w-md">
            <h5 className="mb-3">Select a Branch</h5>
            <select
              className="form-select mb-3"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">-- Select Branch --</option>
              {branches.map((branch) => (
                <option key={branch.OurBranchId} value={branch.OurBranchId}>
                  {branch.BranchName}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button className="btn btn-primary" onClick={handleBranchSelect}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
