import React from 'react'
import { AuthContext } from './AuthContext'
import { useState } from 'react'
import { useEffect } from 'react';
import api from '../libs/axios';
import toast from 'react-hot-toast'

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, [])

    const checkAuth = async () => {
        try {
            const res = await api.get('/users/me');
            setUser(res.data);
        } catch (error) {
            setUser(null)
                console.log('error logging in', error);
                toast.error("Please Login first");
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        setUser(userData);
    }

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } finally {
            setUser(null);           
        }
    };


  return (
    <AuthContext.Provider
        value = {
            {
                user,
                loading,
                login,
                logout,
                checkAuth
            }
        }
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;