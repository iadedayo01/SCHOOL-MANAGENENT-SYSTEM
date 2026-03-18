import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

// create prefect query
export const createPrefectService = async (req, res) => {
  try {
    const school_id = req.user.schoolId;

    const { role, student_id, status } = req.body;
    console.log(req.body);

    if (!role || !student_id) {
      return errorResponse(res, 400, "All fields are required");
    }

    const nameExists = await pool.query(
      `SELECT * FROM prefects WHERE student_id = $1`,
      [student_id],
    );
    console.log(nameExists);

    if (nameExists.rows.length > 0) {
      return errorResponse(res, 400, "Prefect already exists");
    }

    // create prefect query
    const createPrefectQuery = `
            INSERT INTO prefects(role, student_id, status, school_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

    // execute students query
    const prefectResult = await pool.query(createPrefectQuery, [
      role,
      student_id,
      status,
      school_id,
    ]);
    console.log(prefectResult);

    return successResponse(
      res,
      200,
      "Prefect created successfully",
      prefectResult.rows,
    );
  } catch (error) {
    console.log(error);

    return errorResponse(res, 500, "Prefect creation failed");
  }
};

// get all prefects
export const getAllPrefects = async (req, res) => {
  try {
    const allPrefects = await pool.query(
      `SELECT p.role, p.student_id, s.first_name, s.last_name, p.status, p.school_id
            FROM prefects p
            INNER JOIN students s
            ON p.student_id = s.id
            `,
    );
    console.log(allPrefects);

    return successResponse(
      res,
      200,
      "All prefects fetched successfully",
      allPrefects.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error fetching all prefects");
  }
};

// get prefect by id
export const getPrefectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getPrefect = await pool.query(
      `SELECT p.role, p.student_id, s.first_name, s.last_name, p.status, p.school_id
            FROM prefects p
            INNER JOIN students s
            ON p.student_id = s.id
            WHERE p.id = $1
            `,
      [id],
    );
    console.log(getPrefect);

    return successResponse(
      res,
      200,
      "Prefect fetched successfully",
      getPrefect.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error fetching prefect");
  }
};

// edit prefect by id
export const editPrefectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { role, student_id, status } = req.body;
    console.log(req.body);

    const editPrefect = await pool.query(
      `UPDATE prefects SET role = COALESCE ($1, role), student_id = COALESCE ($2, student_id), status = COALESCE ($3, status) WHERE id = $4 RETURNING *`,
      [role, student_id, status, id],
    );
    console.log(editPrefect);

    return successResponse(
      res,
      200,
      "Prefect edit successful",
      editPrefect.rows,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Prefect edit failed");
  }
};

// delete prefect by id
export const deletePrefectById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const deletePrefect = await pool.query(`DELETE FROM prefects WHERE id = $1`, [id])
        console.log(deletePrefect)

        return successResponse(res, 200, "Prefect deleted successfully")
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error deleting prefect")
    }
}