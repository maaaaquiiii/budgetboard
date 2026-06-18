import React from 'react';
import type { Transaction } from '../types';

interface Props {
    transactions: Transaction[];
    onDelete: (id: number) => void;
}

export default function TransactionTable({ transactions, onDelete }: Props) {
    const fmt = (n: number) =>
        new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(n);

    if (transactions.length === 0) {
        return <p data-testid="empty-state">No transactions yet. Add your first one!</p>;
    }

    return (
        <table data-testid="transaction-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
                <th style={th}>Date</th>
                <th style={th}>Description</th>
                <th style={th}>Category</th>
                <th style={th}>Type</th>
                <th style={th}>Amount</th>
                <th style={th}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((t) => (
                <tr key={t.id} data-testid={`transaction-row-${t.id}`} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={td}>{t.date}</td>
                    <td style={td}>{t.description ?? '—'}</td>
                    <td style={td}>{t.category}</td>
                    <td style={td}>
              <span style={{ color: t.type === 'INCOME' ? '#065f46' : '#991b1b', fontWeight: 600 }}>
                {t.type}
              </span>
                    </td>
                    <td style={{ ...td, fontWeight: 600, color: t.type === 'INCOME' ? '#065f46' : '#991b1b' }}>
                        {t.type === 'EXPENSE' ? '−' : '+'}{fmt(t.amount)}
                    </td>
                    <td style={td}>
                        <button
                            data-testid={`delete-btn-${t.id}`}
                            onClick={() => onDelete(t.id)}
                            style={{ background: '#fee2e2', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', color: '#991b1b' }}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const th: React.CSSProperties = { padding: '10px 12px', fontWeight: 600, fontSize: 13 };
const td: React.CSSProperties = { padding: '10px 12px', fontSize: 14 };