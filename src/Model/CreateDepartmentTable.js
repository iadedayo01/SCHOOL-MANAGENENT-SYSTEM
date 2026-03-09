export const createDepartmentTable = `
CREATE TABLE IF NOT EXISTS departments (
id SERIAL PRIMARY KEY,
name VARCHAR(50),
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`