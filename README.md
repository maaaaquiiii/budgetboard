# BudgetBoard 💰

A personal finance dashboard built with **Java + Spring Boot** (backend) and **React + TypeScript** (frontend), with a full **Playwright E2E test suite** using the Page Object Model.

> Built to demonstrate backend engineering skills alongside QA automation practices.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 21, Spring Boot 3.4, Spring Security, JPA |
| Database | PostgreSQL 16, Flyway migrations |
| Auth | JWT (jjwt 0.12) |
| Docs | Swagger UI (SpringDoc) |
| Frontend | React 18, TypeScript, Vite |
| Testing | JUnit 5, Testcontainers, Playwright (POM) |
| DevOps | Docker, Docker Compose |

---

## Features

- **JWT authentication** — register, login, token-protected routes
- **Transaction CRUD** — create, read, update, delete income/expense entries
- **Category filtering** — FOOD, TRANSPORT, SALARY, ENTERTAINMENT, HEALTH, OTHER
- **Monthly summary** — total income, total expenses, current balance
- **Pagination** — all list endpoints paginated
- **Swagger UI** — full API documentation at `/swagger-ui.html`
- **E2E test suite** — 12 Playwright test cases covering happy paths, negative cases, and data integrity

---

## Project Structure

```
budgetboard/
├── src/
│   ├── main/java/com/budgetboard/
│   │   ├── controller/        # REST endpoints
│   │   ├── service/           # Business logic
│   │   ├── repository/        # JPA repositories
│   │   ├── model/             # JPA entities
│   │   ├── dto/               # Request/Response DTOs
│   │   ├── security/          # JWT filter + Spring Security config
│   │   ├── config/            # Swagger + CORS config
│   │   └── exception/         # Global error handling
│   ├── main/resources/
│   │   ├── application.yml
│   │   └── db/migration/      # Flyway SQL scripts
│   └── test/                  # JUnit + Testcontainers
├── frontend/                  # React + TypeScript (Vite)
├── tests/                     # Playwright E2E suite
│   ├── pages/                 # Page Object Model
│   ├── specs/                 # Test suites
│   ├── fixtures/              # Test data
│   └── utils/                 # Helpers
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```

---

## Getting Started

### Prerequisites

- Java 21+
- Docker Desktop
- Node.js 18+

### Run with Docker Compose

```bash
# Clone the repo
git clone https://github.com/maaaaquiiii/budgetboard.git
cd budgetboard

# Start PostgreSQL + backend
docker compose up --build

# API available at:
# http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

### Run backend locally (with Docker DB only)

```bash
# Start only the database
docker compose up db -d

# Run the Spring Boot app
./mvnw spring-boot:run
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | List all (paginated) |
| POST | `/api/transactions` | Create new transaction |
| GET | `/api/transactions/{id}` | Get by ID |
| PUT | `/api/transactions/{id}` | Update transaction |
| DELETE | `/api/transactions/{id}` | Delete transaction |
| GET | `/api/summary` | Monthly income/expense/balance |

All transaction endpoints require `Authorization: Bearer <token>` header.

---

## Running Tests

### JUnit + Testcontainers (backend)

```bash
./mvnw test
```

### Playwright E2E (requires frontend running)

```bash
cd tests
npm install
npx playwright test

# With UI mode (recommended for debugging)
npx playwright test --ui

# Generate test report
npx playwright show-report
```

---

## Test Coverage

| Suite | Test cases | Type |
|-------|-----------|------|
| `auth.spec.js` | Login valid, login invalid, login empty fields, register, guard redirect | Auth flows |
| `transactions.spec.js` | Create valid, create missing amount, edit, delete, appears in dashboard | CRUD + E2E |
| `summary.spec.js` | Balance updates on income, balance updates on expense, pagination | Data integrity |

---

## Status

> 🚧 **In active development** — backend complete, frontend and Playwright suite in progress.

| Milestone | Status |
|-----------|--------|
| Project setup + Docker | ✅ Done |
| Database migrations (Flyway) | ✅ Done |
| Auth (JWT) | 🔄 In progress |
| Transaction API | 🔄 In progress |
| React frontend | ⏳ Pending |
| Playwright suite | ⏳ Pending |

---

## Author

**Esperanza Macarena Plaza Martínez**
[GitHub](https://github.com/maaaaquiiii) · [LinkedIn](https://linkedin.com/in/macarena-plaza)