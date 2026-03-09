export const createAnnouncementTable = `
CREATE TABLE IF NOT EXISTS announcements(
id SERIAL PRIMARY KEY,
title VARCHAR(225) NOT NULL,
content TEXT,
school_id INT REFERENCES schools(id) ON DELETE CASCADE,
created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
