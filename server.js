import express from "express";
import pg from "pg";

const PORT = 3000;
const DB = "fs_spa";

const client = new pg.Client({
  database: DB,
});

try {
  await client.connect();
} catch (err) {
  console.error(err);
}

const app = express();

//enable middleware for receiving JSON request body
app.use(express.json());

// middle ware to server static files
app.use(express.static("public"));

app.get("/api/teachers", (req, res) => {
  client.query("SELECT * FROM teachers", (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching teachers");
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/api/courses", (req, res) => {
  client.query("SELECT * FROM courses", (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching courses");
    } else {
      res.json(result.rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.err(err);
  res.sendStatus(500);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
