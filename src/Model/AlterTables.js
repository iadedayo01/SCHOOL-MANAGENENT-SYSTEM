export const alterStudentTable = `
    ALTER TABLE students
    ADD COLUMN IF NOT EXISTS state_of_origin VARCHAR(20)
`;

export const removeStudentTable = `
ALTER TABLE students
DROP COLUMN state_of_origin
`;

export const alterAssignmentTable = `
    ALTER TABLE assignments
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`;

export const alterTeacherTable = `
ALTER TABLE teachers
ADD COLUMN IF NOT EXISTS created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`

export const alterPrefectsStatus = `
    ALTER TABLE prefects
    DROP COLUMN status
`

export const addPrefectsStatus = `
    ALTER TABLE prefects
    ADD COLUMN IF NOT EXISTS status VARCHAR(20) CHECK (status IN ('active', 'inactive'))
`