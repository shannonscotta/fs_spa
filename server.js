import express from "express";
import pg from "pg";

const PORT = 3000;
const DB = "fs_spa";

const client = new pg.Client({
  database: DB,
});

client.connect()
    .then(() => console.log("Database connected successfully ✅"))
    .catch((err) => console.error("Database connection error", err))

const app = express();

//enable middleware for receiving JSON request body
app.use(express.json());

// middleware to server static files
app.use(express.static("public"));

// CRUD routes for courses

app.get('/api/courses', (req, res) => {
    client.query("SELECT * FROM courses;")
    .then(result => res.json(result.rows))
    .catch(err => {
        console.error(err);
        res.status(500);
        res.send("Error in GET courses");
    });
});

app.post('api/courses', (req, res) => {
    const { course_name, teacher_id } = req.body;
    const query = "INSERT INTO courses(course_name, teacher_id) VALUES($1, $2) RETURNING *;"

    client.query(query, [course_name, teacher_id])
    .then(result => res.json(result.rows[0]))
    .catch( err => {
        console.error(err);
        res.status(500);
        res.send("Error creating course");
    })
})

app.put('api/courses/:id', (req, res) => {
    const { course_name, teacher_id } = req.body;
    const query = "UPDATE courses SET course_name = $1, teacher_id = $2 WHERE course_id = $3 RETURNING *;"

    client.query(query, [course_name, teacher_id, req.params.id])
        .then(result => res.json(result.rows[0]))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send("Error updating course");
        })
})

app.delete('api/courses/:id', (req, res) => {
    const query = "DELETE FROM courses WHERE course_id = $1;";

    client.query(query, [req.params.id])
        .then(() => res.send("Course deleted successfully"))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send("Error deleting course");
        });
});

//make a patch req

app.use((err, req, res, next) => {
  console.err(err);
  res.sendStatus(500);
  res.send("Internal server error");
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
