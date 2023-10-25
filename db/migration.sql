DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS courses;

CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL UNIQUE,
    teacher_id INTEGER REFERENCES teachers(teacher_id)
);

