export const createTeachersTable = `
    CREATE TABLE IF NOT EXISTS teachers(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    user_id INT REFERENCES users(id) ON DELETE CASCADE
)
`