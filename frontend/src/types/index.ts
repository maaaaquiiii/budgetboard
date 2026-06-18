export type TransactionType = 'INCOME' | 'EXPENSE';

export type Category =
    | 'FOOD'
    | 'TRANSPORT'
    | 'SALARY'
    | 'ENTERTAINMENT'
    | 'HEALTH'
    | 'OTHER';

export interface Transaction {
    id: number;
    amount: number;
    type: TransactionType;
    category: Category;
    description: string | null;
    date: string;
    createdAt: string;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface Summary {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    month: number;
    year: number;
}

export interface AuthResponse {
    token: string;
    email: string;
    name: string;
}

export interface TransactionRequest {
    amount: number;
    type: TransactionType;
    category: Category;
    description?: string;
    date?: string;
}