import { pool } from "../../config/db.js";

export const createSubjectService = async (req, res) => {
  try {
    const school_id = req.user.schoolId;

    console.log("check", req.user);
    const { name, code, dept_id } = req.body;
    console.log(req.body);

    if ((!name, !code, !dept_id)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const nameExists = await pool.query("SELECT * FROM subjects WHERE name = $1", [name])
    if (nameExists.rows.length > 0) {
        return res.status(400).json({
            message: "Subject name already exists"
        })
    }

    const createSubjectQuery = `
            INSERT INTO subjects (name, code, dept_id, school_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

    const subjectResult = await pool.query(createSubjectQuery, [
      name,
      code,
      dept_id,
      school_id,
    ]);
    console.log(subjectResult);

    return res.status(200).json({
      message: "Subjects Created successfully",
      data: subjectResult.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Error creating subjects",
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const allSubjects = await pool.query(`SELECT * FROM subjects`);
    console.log(allSubjects);

    return res.status(200).json({
      message: "All subjects fetched successfully",
      data: allSubjects.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Subjects fetching failed",
    });
  }
};

export const getSubjectById = async (req, res) => {
  const id = parseInt(req.params.id);

  const getSubject = await pool.query(`SELECT * FROM subjects WHERE id = $1`, [
    id,
  ]);
  console.log(getSubject);

  return res.status(200).json({
    message: "Subject fetched successfully",
    data: getSubject.rows,
  });
};

export const editSubjectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, code, dept_id, status } = req.body;
    console.log(req.body);

    const editSubject = await pool.query(
      `UPDATE subjects SET name = COALESCE($1, name), code = COALESCE($2, code), dept_id = COALESCE ($3, dept_id), status = COALESCE($4, status) WHERE id = $5 RETURNING *`,
      [name, code, dept_id, status, id],
    );
    console.log(editSubject);

    return res.status(200).json({
      message: "Subject updated successfully",
      data: editSubject.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Subject edit failed",
    });
  }
};

export const deleteSubjectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deleteSubject = await pool.query(
      `DELETE FROM subjects WHERE id = $1`,
      [id],
    );
    console.log(deleteSubject);

    return res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Subject delete failed",
    });
  }
};
