import { pool } from "../../config/db.js";
import { generatePassword } from "../../utils/generatePassword.js";
import bcrypt from "bcrypt"

 const signupService = async (req, res) => {
  // Schools Table => school name, address, logo_url,
  // Users table => email, password, role

  const client = await pool.connect()

  try {
    const { schoolName, address, email, logoUrl } = req.body;
    console.log(req.body)

    if (!schoolName || !address || !logoUrl) {
      return res
      .status(400).json({ message: "All fields are required" });
    }

    const emailExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailExists.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      })
    }

    // start transaction
    await client.query('BEGIN')

    // creating schoools

    // create school query
    const createSchoolQuery = `
        INSERT INTO schools (name, address, logo_url)
        VALUES ($1, $2, $3) 
        RETURNING *
    `

    // execute school query
    const schoolResult = await client.query(createSchoolQuery, [schoolName, address, logoUrl])

    // extract school id
    console.log("school result", schoolResult.rows)
    const schoolId = schoolResult.rows[0].id;
    const schoolInfo = schoolResult.rows[0]



    // creating users
    const password = generatePassword(schoolName);
    console.warn("the user password is:", password)

    const role = "admin";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user query
    const createUserQuery = `
        INSERT INTO users (school_id, email, password, role)
        VALUES ($1,$2,$3,$4)
        RETURNING *
    `

    // execute user query
    const userResult = await client.query(createUserQuery, [schoolId, email, hashedPassword, role])
    const admin = userResult.rows[0];

    console.log(userResult)


    // commit trannsaction
    await client.query('COMMIT')

    return res.status(201).json({
        message: "Signup Successful",
        data: {
            schoolName: schoolInfo.name,
            address: schoolInfo.address,
            logoUrl: schoolInfo.logo_url,
            email: admin.email,
        }
    })

  } catch (error) {

    // rollback transaction
    await client.query('ROLLBACK')
    console.log(error)

    return res.status(500).json({
        message: "Signup Failed",
        error: error.message
    })
  }finally{
    client.release()    
  }
};

export default signupService;
