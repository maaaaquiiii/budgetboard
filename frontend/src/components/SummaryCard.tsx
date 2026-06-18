import type { Summary } from '../types';

const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
];

interface Props { summary: Summary; }

export default function SummaryCard({ summary }: Props) {
    const fmt = (n: number) =>
        new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(n);

    return (
        <div data-testid="summary-card" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={card('#d1fae5')}>
                <p style={label}>Income</p>
                <p data-testid="total-income" style={value('#065f46')}>{fmt(summary.totalIncome)}</p>
            </div>
            <div style={card('#fee2e2')}>
                <p style={label}>Expenses</p>
                <p data-testid="total-expenses" style={value('#991b1b')}>{fmt(summary.totalExpenses)}</p>
            </div>
            <div style={card('#e0e7ff')}>
                <p style={label}>Balance — {MONTHS[summary.month - 1]} {summary.year}</p>
                <p data-testid="balance" style={value(summary.balance >= 0 ? '#1e3a8a' : '#991b1b')}>
                    {fmt(summary.balance)}
                </p>
            </div>
        </div>
    );
}

const card = (bg: string): React.CSSProperties => ({
    background: bg, borderRadius: 8, padding: '1rem 1.5rem', minWidth: 180,
});
const label: React.CSSProperties = { margin: 0, fontSize: 12, color: '#6b7280', fontWeight: 600 };
const value = (color: string): React.CSSProperties => ({
    margin: '0.25rem 0 0', fontSize: 22, fontWeight: 700, color,
});