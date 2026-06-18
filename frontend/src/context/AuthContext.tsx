import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';
import type { AuthResponse } from '../types';

interface AuthContextType {
    user: { email: string; name: string } | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const name = localStorage.getItem('name');
        return token && email && name ? { email, name } : null;
    });

    const login = async (email: string, password: string) => {
        const { data } = await api.post<AuthResponse>('/api/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        setUser({ email: data.email, name: data.name });
    };

    const register = async (name: string, email: string, password: string) => {
        const { data } = await api.post<AuthResponse>('/api/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        setUser({ email: data.email, name: data.name });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}