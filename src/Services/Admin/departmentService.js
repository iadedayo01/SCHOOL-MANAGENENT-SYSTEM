import { pool } from "../../config/db.js";

export const departmentService = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body);

    if (!name) {
      return res.status(400).json({
        message: "Department name is required",
      });
    }

    const deptExists = await pool.query(
      `SELECT * FROM departments WHERE name = $1`,
      [name],
    );
    console.log("department exist response:", deptExists);

    if (deptExists.rows.length > 0) {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    const createDepartmentQuery = `
            INSERT INTO departments (name)
            VALUES ($1)
            RETURNING *
        `;

    const departmentResult = await pool.query(createDepartmentQuery, [name]);
    console.log(departmentResult);

    return res.status(200).json({
      message: "Department created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Department creation failed",
    });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const allDepartments = await pool.query("SELECT * FROM departments");
    console.log(allDepartments);

    return res.status(200).json({
      message: "All departments fetched successfully",
      data: allDepartments.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Error fetching departments",
    });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getDepartment = await pool.query(
      `SELECT * FROM departments WHERE id = $1`,
      [id],
    );
    console.log(getDepartment);

    return res.status(200).json({
      message: "Department fetched successfully",
      data: getDepartment.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Department fetch failed",
    });
  }
};

export const editDepartmentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name } = req.body;

    const editDepartment = await pool.query(
      `UPDATE departments SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id],
    );
    console.log(editDepartment);

    return res.status(200).json({
      message: "Department Updated successfully",
    });
  } catch (error) {
    console.log(error)

    return res.status(400).json({
        message: "Department edit failed"
    })
  }
};

export const deleteDepartmentById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const deleteDepartment = await pool.query(`DELETE FROM departments WHERE id = $1`, [id])
        console.log(deleteDepartment)

        return res.status(200).json({
            message: "Department deleted successfully"
        })
    } catch (error) {
        console.log(error)

        return res.status(400).json({
            message: "Department failed to delete"
        })
    }
}