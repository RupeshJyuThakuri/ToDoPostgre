for backend setup create .env file and paste these 
PORT = 5000
DB_USER = postgres
DB_PASSWORD = postgres
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = todoapp
JWT_SECRET = fullstackdevintern

For DataBase
create a database with "todoapp"
use these code to create tables:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


After these setup
cd backend > npm install or npm i > npm run dev //to start server
cd frontend > npm install or npm i > npm run dev //to start server
