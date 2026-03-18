import bcrypt from "bcrypt";
import { pool } from "../../config/db.js";
import { generatePassword } from "../../utils/generatePassword.js";

export const createTeacherService = async (req, res) => {
  const client = await pool.connect();

  try {
    const { first_name, last_name, gender, email } = req.body;
    console.log(req.body);

    const schoolId = req.user.schoolId;

    if ((!first_name || !last_name || !gender || !email)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailExists = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    console.log("Email exists response", emailExists);

    if (emailExists.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // start transaction
    await client.query("BEGIN");

    const password = generatePassword(schoolId);
    console.warn("the password is", password);

    const role = "teacher";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user query
    const createUserQuery = `
        INSERT INTO users (school_id, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    // execute user query
    const userResult = await client.query(createUserQuery, [
      schoolId,
      email,
      hashedPassword,
      role,
    ]);

    // extract user id
    const userId = userResult.rows[0].id;
    const userInfo = userResult.rows[0];

    // create teacher query
    const createTeacherQuery = `
        INSERT INTO teachers (first_name, last_name, gender, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    // execute teacher query
    const teacherResult = await client.query(createTeacherQuery, [
      first_name,
      last_name,
      gender,
      userId,
    ]);
    const teacher = teacherResult.rows[0];

    console.log(teacherResult);

    // commit transaction
    await client.query("COMMIT");

    return res.status(201).json({
      message: "Teacher Signup successful",
      data: {
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        gender: teacher.gender,
        email: userInfo.email,
      },
    });
  } catch (error) {
    // rollback transaction
    console.log(error);

    return res.status(500).json({
      message: "Teacher signup failed",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const allTeachers = await pool.query(`SELECT * FROM teachers`);
    console.log(allTeachers);

    return res.status(200).json({
      message: "Fetch all Teachers",
      data: {
        teachers: allTeachers.rows,
        noOfTeachers: allTeachers.rowCount,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Error fetching all teachers",
    });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const teacher = await pool.query(`SELECT * FROM teachers WHERE id = $1`, [
      id,
    ]);
    console.log(teacher)

    return res.status(200).json({
      message: "Teacher request successful",
      data: teacher.rows
    })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: "Teacher request failed"
    })
  }
};

export const deleteTeacherById = async (req, res) => {
  try {
  const id = parseInt(req.params.id)

    const deleteTeacher = await pool.query(`DELETE FROM teachers WHERE id = $1`, [id])
    console.log(deleteTeacher)

    return res.status(200).json({
      message: "Teacher deleted successfully"
    })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: "Error deleting teacher"
    })
  }
}

export const editTeacherById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const {first_name, last_name, gender} = req.body

  const editTeacher = await pool.query(`UPDATE teachers SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), gender = COALESCE($3, gender) WHERE id = $4 RETURNING *`, [first_name, last_name, gender, id])
  console.log(editTeacher)

  return res.status(200).json({
    message: "Teacher Information edit successfully",
    data: editTeacher.rows
  })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      message: "Teacher information edit failed"
    })
  }
}