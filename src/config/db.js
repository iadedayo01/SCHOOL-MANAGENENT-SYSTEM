import pg from "pg";

import dotenv from "dotenv";
import { createStudentTable } from "../Model/CreateStudentTable.js";
import { addPrefectsStatus, addTeacherSchoolId, alterAssignmentTable, alterPrefectsStatus, alterStudentTable, alterTeacherTable, removeStudentTable } from "../Model/AlterTables.js";
import { createSchoolTable } from "../Model/CreateSchoolTable.js";
import { createAnnouncementTable } from "../Model/CreateAnnouncementTable.js";
import { createDepartmentTable } from "../Model/CreateDepartmentTable.js";
import { createClassTable } from "../Model/CreateClassTable.js";
import { createSubjectTable } from "../Model/CreateSubjectTable.js";
import { createAssignmentTable } from "../Model/CreateAssignmentTable.js";
import { createTeachersTable } from "../Model/CreateTeacherTable.js";
import { createUserTable } from "../Model/CreateUserTable.js";
import { createPrefectsTable } from "../Model/CreatePrefectTable.js";

dotenv.config();

 export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const initDb = async () => {
  try {

    const client = await pool.connect()

    /*
    * school
    * users
    * announcement
    * dept
    * class
    * subject
    * assignment
    * student
    * teacher
    * 
    * ALTER
     
    */


    // CREATE TABLES

    await client.query(createSchoolTable);
    console.log("School table created successfully")

    await client.query(createUserTable);
    console.log("User Table created successfully");

    await client.query(createAnnouncementTable);
    console.log("Announcement table created successfully");

    await client.query(createDepartmentTable);
    console.log("Department table created successfully");

    await client.query(createClassTable);
    console.log("Class table created successfully");

    await client.query(createSubjectTable);
    console.log("Subject table created successfully");
 
    await client.query(createStudentTable);
    console.log("Student table created successfully");
    
    await client.query(createTeachersTable);
    console.log("Teachers table created successfully");
    
    await client.query(createAssignmentTable);
    console.log("Assignment table created successfully");

    await client.query(createPrefectsTable);
    console.log("Prefects table created successfully")
    // ALTER TABLES
    // await client.query(alterStudentTable);
    console.log("student table altered successfully")

    await client.query(alterAssignmentTable);
    console.log("Assignment table updated")

    await client.query(alterTeacherTable);
    console.log("Teacher table updated")

    // await client.query(addPrefectsStatus);
    console.log("Prefect Status updated successfully")

    await client.query(addTeacherSchoolId);
    console.log("teachers school id updated")

    // Remove Student Table column
    // await client.query(removeStudentTable)
    console.log("origin column removed successfully")

    // await client.query(alterPrefectsStatus);
    console.log("Status column removed successfully");



    client.release();
  } catch (error) {
    console.log(error, "Database not connected");
  }
};
