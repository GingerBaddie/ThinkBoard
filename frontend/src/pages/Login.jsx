import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import api from '../libs/axios';




function Login() {

    const { user, login, loading: authLoading} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
    if(!authLoading && user) {
          navigate('/');
      }
    }, [user, navigate, authLoading]);


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;    

    if(!formData.email.trim() || !formData.password.trim()) {
        toast.error('All fields are required');
        return setError("Please fill in all fields.");
    } 
    
    try {
        setLoading(true);
        const res = await api.post('/users/login', {
            email,
            password
        });
        console.log(formData);
        login(res.data);
        toast.success('Login Successful');
        
    } catch (error) {
        setError(error.response?.data?.message || "Login failed");
        toast.error(error.response?.data?.message || "Login failed");
    } finally {
        setLoading(false);
    }
    
        
    }
    
    return (
       <>
            <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-base-content/70 mt-2 mb-6">
          Login to your account
        </p>

        {error && (
          <div className="alert alert-error mb-5">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${
              loading ? "btn-disabled" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
       </> 
    
    );
}

export default Login;