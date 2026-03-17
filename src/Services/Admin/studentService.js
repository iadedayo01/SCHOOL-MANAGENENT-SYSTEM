import bcrypt from "bcrypt";
import { pool } from "../../config/db.js";
import { generatePassword } from "../../utils/generatePassword.js";

export const createStudentService = async (req, res) => {
  const client = await pool.connect();

  try {
    const { first_name, last_name, gender, age, email, state_of_origin } =
      req.body;
    console.log(req.body);

    const school_id = req.user.schoolId;
    const user_id = req.user.id;

    if ((!first_name, !last_name, !gender, !age, !email, !state_of_origin)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailExists = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    if (emailExists.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // start transaction
    await client.query("BEGIN");

    const password = generatePassword(school_id);
    console.warn("the password is", password);

    const role = "student";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user query
    const createUserQuery = `
            INSERT INTO users (school_id, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

    // execute user query
    const userResult = await client.query(createUserQuery, [
      school_id,
      email,
      hashedPassword,
      role,
    ]);

    // extract user id
    const userId = userResult.rows[0].id;
    const userInfo = userResult.rows[0];

    // create student query
    const createStudentQuery = `
            INSERT INTO students(first_name, last_name, gender, age, state_of_origin, user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;

    // execute students query
    const studentResult = await client.query(createStudentQuery, [
      first_name,
      last_name,
      gender,
      age,
      state_of_origin,
      user_id,
    ]);
    const student = studentResult.rows[0];

    console.log(studentResult);

    // commit transaction
    await client.query("COMMIT");

    return res.status(201).json({
      message: "Student signup successful",
      data: {
        first_name: student.first_name,
        last_name: student.last_name,
        gender: student.gender,
        age: student.age,
        email: userInfo.email,
        state_of_origin: student.state_of_origin,
      },
    });
  } catch (error) {
    // rollback transaction
    console.log(error);

    await client.query("ROLLBACK");
    return res.status(400).json({
      message: "Student signup failed",
    });
  }
};

// get all students
export const getAllStudents = async (req, res) => {
  try {
    const allStudents = await pool.query(`SELECT * FROM students`);
    console.log(allStudents);

    return res.status(201).json({
      message: "All students fetched successfully",
      data: allStudents.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Error fetching students",
    });
  }
};

// get student by id
export const getStudentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getStudent = await pool.query(
      `SELECT * FROM students WHERE id = $1`,
      [id],
    );
    console.log(getStudent);

    return res.status(201).json({
      message: "Student fetched successfully",
      data: getStudent.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Student fetching failed",
    });
  }
};

// edit student by id
export const editStudentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { first_name, last_name, gender, age, state_of_origin } = req.body;

    const editStudent = await pool.query(
      `UPDATE students SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), gender = COALESCE ($3, gender), age = COALESCE($4, age), state_of_origin = COALESCE ($5, state_of_origin) WHERE id = $6 RETURNING *`,
      [first_name, last_name, gender, age, state_of_origin, id],
    );
    console.log(editStudent);

    return res.status(200).json({
      message: "Student Updated successfully",
      data: editStudent.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Student update failed",
    });
  }
};

// delete student by id
export const deleteStudentById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const deleteStudent = await pool.query(`DELETE FROM students WHERE id = $1`, [id])
        console.log(deleteStudent)

        return res.status(200).json({
            message: "Student deleted successfully"
        })
    } catch (error) {
        console.log(error)

        return res.status(400).json({
            message: "Student delete failed"
        })
    }
}