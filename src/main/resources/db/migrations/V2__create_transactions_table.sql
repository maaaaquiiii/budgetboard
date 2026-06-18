CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE');

CREATE TYPE transaction_category AS ENUM (
    'FOOD',
    'TRANSPORT',
    'SALARY',
    'ENTERTAINMENT',
    'HEALTH',
    'OTHER'
);

CREATE TABLE transactions (
    id          BIGSERIAL            PRIMARY KEY,
    user_id     BIGINT               NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount      NUMERIC(12, 2)       NOT NULL CHECK (amount > 0),
    type        transaction_type     NOT NULL,
    category    transaction_category NOT NULL DEFAULT 'OTHER',
    description VARCHAR(255),
    date        DATE                 NOT NULL DEFAULT CURRENT_DATE,
    created_at  TIMESTAMP            NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP            NOT NULL DEFAULT NOW()
);

-- Index for filtering transactions by user
CREATE INDEX idx_transactions_user_id ON transactions(user_id);

-- Index for date-range queries (monthly summary)
CREATE INDEX idx_transactions_date ON transactions(date);