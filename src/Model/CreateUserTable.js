export const createUserTable = `
   CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
        school_id INT REFERENCES schools(id) ON DELETE CASCADE,
        created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
