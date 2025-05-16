# Monorepo Project (Frontend + Backend)

This repository contains two main services:  
- **backend** — Node.js server using Sequelize and PostgreSQL  
- **client** — frontend application located in a separate folder

---
## Required .env Files

To run the project correctly, you need to create a `.env` and `pg.env` file in the ./client and ./backend folders with the following variables:

BACKEND
```env
PORT=4444
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=mydb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
JWT_SECRET_KEY=github_crm_secret
JWT_REFRESH_SECRET_KEY=github_crm_refresh_secret
NODE_ENV=development
GITHUB_BASE_URL='https://api.github.com'
```

```pg.env
POSTGRES_DB=mydb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

CLIENT
```env
REACT_APP_API_URL=http://localhost:4444
```
Note:
Please create it locally before running the project.

---

## Running the Project with Docker Compose
Make sure you have Docker and Docker Compose installed.

Run the following command from the ./backend:

```
docker-compose up --build
```

This command will:

Build the backend service

Start the PostgreSQL database

Run database migrations using sequelize-cli

Start the backend server on port 4444

---

## Client
Run the following command from the ./client:

```
docker-compose up --build
```

To stop the containers:

```
docker-compose down
```
