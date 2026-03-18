import { pool } from "../../config/db.js";
import { errorResponse, successResponse } from "../../utils/responseHandler.js";

// create class
export const createClassService = async (req, res) => {
  try {
    const school_id = req.user.schoolId;

    const { name, dept_id } = req.body;
    console.log(req.body);

    if (!name || !dept_id) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const nameExists = await pool.query(
      "SELECT * FROM classes WHERE name = $1",
      [name],
    );
    if (nameExists.rows.length > 0) {
      return res.status(400).json({
        message: "Class name already exists",
      });
    }

    const createClassQuery = `
            INSERT INTO classes (name, dept_id, school_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

    const classResult = pool.query(createClassQuery, [
      name,
      dept_id,
      school_id,
    ]);
    console.log(classResult);

    return res.status(200).json({
      message: "Class created successfully",
      data: classResult.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Class creation failed",
    });
  }
};

// get all classes
export const getAllClasses = async (req, res) => {
  try {
    const allClasses = await pool.query(`SELECT * FROM classes`);
    console.log(allClasses);

    return res.status(200).json({
      message: "Classes successfully retrieved",
      data: allClasses.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Error fetching classes",
    });
  }
};

// get class by id
export const getClassById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getClass = await pool.query(`SELECT * FROM classes WHERE id = $1`, [
      id,
    ]);
    console.log(getClass);

    return res.status(200).json({
      message: "Class retrival successful",
      data: getClass.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Error retriving class",
    });
  }
};

// edit Class by id
export const editClassById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {name, dept_id} = req.body

    const editClass = await pool.query(
      `UPDATE classes SET name = COALESCE ($1, name), dept_id = COALESCE ($2, dept_id) WHERE id = $3`,
      [name, dept_id, id],
    );
    console.log(editClass);

    return res.status(200).json({
      message: "Class edited successfully",
      data: editClass.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Class edit failed",
    });
  }
};

// delete class by id
export const deleteClassById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const deleteClass = await pool.query(`DELETE FROM classes WHERE id = $1`, [id])
        console.log(deleteClass)

        return successResponse(res,200, "Class deleted successfully")
    } catch (error) {
        console.log(error)

        return errorResponse(res,500, "Error deleting response")
    }
}