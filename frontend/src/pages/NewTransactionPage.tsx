import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import type { Category, TransactionType } from '../types';

export default function NewTransactionPage() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<TransactionType>('EXPENSE');
    const [category, setCategory] = useState<Category>('OTHER');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!amount || parseFloat(amount) <= 0) {
            setError('Amount must be greater than 0');
            return;
        }
        setLoading(true);
        try {
            await api.post('/api/transactions', { amount: parseFloat(amount), type, category, description, date });
            navigate('/dashboard');
        } catch {
            setError('Failed to create transaction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const CATEGORIES: Category[] = ['FOOD', 'TRANSPORT', 'SALARY', 'ENTERTAINMENT', 'HEALTH', 'OTHER'];

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: '0 1rem' }}>
            <Link to="/dashboard" style={{ color: '#4f46e5', fontSize: 14, textDecoration: 'none' }}>← Back to dashboard</Link>
            <h1 style={{ fontSize: 22, margin: '1rem 0 1.5rem' }}>New Transaction</h1>

            {error && (
                <p data-testid="error-message" style={{ color: '#991b1b', background: '#fee2e2', padding: '10px 12px', borderRadius: 6, marginBottom: '1rem', fontSize: 14 }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <label style={labelStyle}>Amount (€)</label>
                <input data-testid="amount-input" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} style={inputStyle} placeholder="0.00" />

                <label style={labelStyle}>Type</label>
                <select data-testid="type-select" value={type} onChange={(e) => setType(e.target.value as TransactionType)} style={inputStyle}>
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>

                <label style={labelStyle}>Category</label>
                <select data-testid="category-select" value={category} onChange={(e) => setCategory(e.target.value as Category)} style={inputStyle}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>

                <label style={labelStyle}>Description (optional)</label>
                <input data-testid="description-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} placeholder="e.g. Grocery shopping" />

                <label style={labelStyle}>Date</label>
                <input data-testid="date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />

                <button data-testid="submit-btn" type="submit" disabled={loading} style={btn}>
                    {loading ? 'Saving…' : 'Save transaction'}
                </button>
            </form>
        </div>
    );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', marginBottom: '1rem', fontSize: 14, boxSizing: 'border-box' };
const btn: React.CSSProperties = { width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem' };