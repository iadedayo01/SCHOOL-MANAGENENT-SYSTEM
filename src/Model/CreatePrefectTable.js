export const createPrefectsTable = `
    CREATE TABLE IF NOT EXISTS prefects(
    id SERIAL PRIMARY KEY,
    role VARCHAR(50),
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    status VARCHAR (20) CHECK (status IN ('active', 'graduated')),
    school_id INT REFERENCES schools(id) ON DELETE CASCADE,
    created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`