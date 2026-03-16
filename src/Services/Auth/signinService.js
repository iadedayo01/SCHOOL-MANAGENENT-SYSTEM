import { pool } from "../../config/db.js";
import * as bcrypt from "bcrypt";
import { generateJwtToken } from "../../utils/generateToken.js";

export const signinService = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    console.log(userExists);

    if (userExists.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    console.log("Check pg response:", userExists);

    const user = userExists.rows[0];
    console.log("user is:", user)
    console.log(password, user.password)

    console.log("user res",user)

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // after passing all checks
    //generate token

    const token = generateJwtToken(user.id, user.school_id, user.role);
    
    console.log("get school id: ",user.school_id)

    return res.status(200).json({
      message: "signin Successful",
      data: {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          schoolId: user.schoolId
        },
      },
    });
  } catch (error) {
    console.log(error)

    return res.status(500).json({
        message: "Signin Failed"
    })
  }
};
