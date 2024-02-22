const express = require("express");
const mongoose = require("mongoose");
const Course = require("./model/coursesmodel");

const app = express();
const PORT = 4010;

app.get("/", (req, res) => {
    res.send("WELCOME TO ROOT ROUTE OF THE Ma. Donna Fidelino API");
});


//This is for retrieving all published backend courses and sorts them alphabetically by their names.
app.get("/courses/getCoursesSortedByName", async (req, res) => {
  try {
    const years = await Course.find();
    let courses = [];
    years.forEach((year) => {
      ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
        if (year[yearKey]) {
          courses.push(...year[yearKey]);
        }
      });
    });
    courses.sort((a, b) => a.description.localeCompare(b.description));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//This is for the selecting and extracting the name and specialization of each courses.
app.get("/courses/getCoursesNameAndSpecialization", async (req, res) => {
    try {
      const years = await Course.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      const descriptionsAndTags = courses.map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
      res.json(descriptionsAndTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//This is retrieving all published BSIS and BSIT courses from the curriculum.
app.get("/courses/getPublishedCourses", async (req, res) => {
  try {
    const years = await Course.find();
    let courses = [];
    years.forEach((year) => {
      ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
        if (year[yearKey]) {
          courses.push(...year[yearKey]);
        }
      });
    });
    const descriptionsAndTags = courses
      .filter(
        (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
      )
      .map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
    res.json(descriptionsAndTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/mongo")
  .then(() => {
    console.log("Database Connected!");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });