import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch {
            setError('Registration failed. Email may already be in use.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={container}>
            <div style={card}>
                <h1 style={{ margin: '0 0 0.25rem', fontSize: 24 }}>Create account</h1>
                <p style={{ margin: '0 0 1.5rem', color: '#6b7280', fontSize: 14 }}>Start tracking your finances</p>

                {error && (
                    <p data-testid="error-message" style={{ color: '#991b1b', background: '#fee2e2', padding: '10px 12px', borderRadius: 6, marginBottom: '1rem', fontSize: 14 }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={labelStyle}>Name</label>
                    <input data-testid="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required style={input} placeholder="Your name" />

                    <label style={labelStyle}>Email</label>
                    <input data-testid="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={input} placeholder="you@example.com" />

                    <label style={labelStyle}>Password</label>
                    <input data-testid="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} style={input} placeholder="Min. 8 characters" />

                    <button data-testid="register-btn" type="submit" disabled={loading} style={btn}>
                        {loading ? 'Creating account…' : 'Create account'}
                    </button>
                </form>

                <p style={{ marginTop: '1rem', fontSize: 14, textAlign: 'center', color: '#6b7280' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#4f46e5' }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

const container: React.CSSProperties = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' };
const card: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: '2rem', width: '100%', maxWidth: 400, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' };
const input: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', marginBottom: '1rem', fontSize: 14, boxSizing: 'border-box' };
const btn: React.CSSProperties = { width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer' };