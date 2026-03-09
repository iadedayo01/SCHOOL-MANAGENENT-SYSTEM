import { pool } from "../../config/db.js";

export const deleteAllSchoolsService = async (req, res) => {
    
    try {

        const deleteUsers = await pool.query("DELETE FROM schools RETURNING *")
        console.log(deleteUsers)
        return res.status(200).json({
            message: "School deleted successfully"
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "schools not deleted"
        })
    }


}



export const deleteSchoolByIdService = async (req, res) => {

    try {

        const id = req.params.id

        const schoolExists = await pool.query("SELECT * FROM schools WHERE id = $1", [id])
        if (schoolExists.rows.length === 0) {
            return res.status(400).json({
                message: "School does not exist"
            })
        }
        console.log(schoolExists)

        const deleteUser = await pool.query("DELETE FROM schools WHERE id = $1", [id])

        return res.status(200).json({
            message: "School deleted successfully"
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "School not deleted"
        })
    }
}


