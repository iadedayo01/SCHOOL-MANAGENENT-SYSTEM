import { pool } from "../../config/db.js";
import bcrypt from "bcrypt";

export const ResetPassword = async (req, res) => {
  try {
    const id = req.params.id;

    const { oldPassword, newPassword } = req.body;
    console.log(req.body);

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    console.log(userExists);

    if (userExists.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = userExists.rows[0];
    console.log("user is:", user);
    console.log(oldPassword, user.password);

    // check if password is correct

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const newPasswordQuery = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, id],
    );
    console.log(newPasswordQuery);

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Password reset failed",
    });
  }
};
