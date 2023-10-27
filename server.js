import express from "express";
import pg from "pg";

const PORT = 3000;

const app = express();

const client = new pg.Client({
  connectionString: "postgres://localhost/fs_spa",
});

client
  .connect()
  .then(() => console.log("Database connected successfully ✅"))
  .catch((err) => console.error("Database connection error", err));

// Enable middleware for receiving JSON request body
app.use(express.json());

// Middleware to serve static files
app.use(express.static("public"));

// Get all courses
app.get("/api/courses", (req, res) => {
  client
    .query("SELECT * FROM courses;")
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error in GET courses");
    });
});

// Get course by ID
app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  client
    .query("SELECT * FROM courses WHERE id = $1;", [courseId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send("Course not found");
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error in GET course by ID");
    });
});

// Create new course
app.post("/api/courses", (req, res) => {
  const { course_name, teacher_id } = req.body;
  const query =
    "INSERT INTO courses(course_name, teacher_id) VALUES($1, $2) RETURNING *;";

  client
    .query(query, [course_name, teacher_id])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating course");
    });
});

// Update a course by ID
app.patch("/api/courses/:id", (req, res) => {
  const { course_name, teacher_id } = req.body;
  const query =
    "UPDATE courses SET course_name = $1, teacher_id = $2 WHERE id = $3 RETURNING *;";

  client
    .query(query, [course_name, teacher_id, req.params.id])
    .then((result) => res.json(result.rows[0]))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating course");
    });
});

// Delete a course by ID
app.delete("/api/courses/:id", (req, res) => {
  const query = "DELETE FROM courses WHERE id = $1;";

  client
    .query(query, [req.params.id])
    .then(() => res.send("Course deleted successfully"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting course");
    });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
  res.send("Internal server error");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
