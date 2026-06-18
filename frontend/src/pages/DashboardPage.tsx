import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SummaryCard from '../components/SummaryCard';
import TransactionTable from '../components/TransactionTable';
import api from '../services/api';
import type { Transaction, Summary, Page } from '../types';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async (p = 0) => {
        setLoading(true);
        try {
            const [txRes, sumRes] = await Promise.all([
                api.get<Page<Transaction>>(`/api/transactions?page=${p}&size=10`),
                api.get<Summary>('/api/transactions/summary'),
            ]);
            setTransactions(txRes.data.content);
            setTotalPages(txRes.data.totalPages);
            setSummary(sumRes.data);
            setPage(p);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id: number) => {
        await api.delete(`/api/transactions/${id}`);
        fetchData(page);
    };

    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 22 }}>BudgetBoard</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>Welcome, {user?.name}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link
                        data-testid="add-transaction-btn"
                        to="/transactions/new"
                        style={{ background: '#4f46e5', color: '#fff', padding: '8px 16px', borderRadius: 6, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
                    >
                        + Add transaction
                    </Link>
                    <button onClick={handleLogout} style={{ background: '#f3f4f6', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
                        Logout
                    </button>
                </div>
            </div>

            {summary && <SummaryCard summary={summary} />}

            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: '0.75rem' }}>Transactions</h2>
            {loading ? (
                <p data-testid="loading">Loading…</p>
            ) : (
                <TransactionTable transactions={transactions} onDelete={handleDelete} />
            )}

            {totalPages > 1 && (
                <div data-testid="pagination" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => fetchData(page - 1)} disabled={page === 0} style={pageBtn}>Previous</button>
                    <span style={{ padding: '6px 12px', fontSize: 14 }}>Page {page + 1} of {totalPages}</span>
                    <button data-testid="next-page-btn" onClick={() => fetchData(page + 1)} disabled={page >= totalPages - 1} style={pageBtn}>Next</button>
                </div>
            )}
        </div>
    );
}

const pageBtn: React.CSSProperties = { padding: '6px 14px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 14 };