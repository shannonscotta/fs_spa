fetch("/api/courses")
  .then((response) => {
    if (!response.ok) {
      console.error("Network response was not ok");
      return;
    }
    return response.json();
  })
  .then((data) => {
    if (!data) return;

    const courseList = document.getElementById("courses-list");

    for (let i = 0; i < data.length; i++) {
      const listItem = document.createElement("li");
      listItem.textContent = `${data[i].course_name} (Teacher ID: ${data[i].teacher_id})`;
      courseList.appendChild(listItem);
    }
  })
  .catch((error) => {
    console.error("Error in catch all on app.js:", error);
  });
