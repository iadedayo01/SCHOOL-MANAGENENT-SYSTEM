import { pool } from "../../config/db.js";

export const createAnnouncementService = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.body);

    const school_id = req.user.schoolId;

    if (!title || !content) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // create announcement query
    const createAnnouncementQuery = `
        INSERT INTO announcements(title, content, school_id) 
        VALUES ($1, $2, $3)
        RETURNING *`;

    // execute announcement query
    const announcementResult = await pool.query(createAnnouncementQuery, [
      title,
      content,
      school_id,
    ]);
    console.log(announcementResult);

    return res.status(200).json({
      message: "Announcement created successfully",
      data: announcementResult.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Announcement creation failed",
    });
  }
};

// get all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const allAnnouncements = await pool.query(`SELECT * FROM announcements`);
    console.log(allAnnouncements);

    return res.status(200).json({
      message: "All announcements fetched successfully",
      data: allAnnouncements.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Announcements fetching failed",
    });
  }
};

// get announcement by id
export const getAnnouncementById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const getAnnouncement = await pool.query(
      `SELECT * FROM announcements WHERE id = $1`,
      [id],
    );
    console.log(getAnnouncement);

    return res.status(200).json({
      message: "Announcement fetched successfully",
      data: getAnnouncement.rows,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Announcement fetch failed",
    });
  }
};

// edit announcement by id
export const editAnnouncementById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { title, content } = req.body;
    const editAnnouncement = pool.query(
      `UPDATE announcements SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *`,
      [title, content, id],
    );
    console.log(editAnnouncement);

    return res.status(200).json({
      message: "Announcement edited successfully",
      data: editAnnouncement.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Announcement edit failed",
    });
  }
};

// delete announcement by id
export const deleteAnnouncementById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deleteAnnouncement = await pool.query(
      `DELETE FROM announcements WHERE id = $1`,
      [id],
    );
    console.log(deleteAnnouncement);

    return res.status(200).json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Announcement delete failed",
    });
  }
};
