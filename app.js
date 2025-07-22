import express from "express";
import router from "#api/employees";
const app = express();
export default app;

// since all the API shit is done in json
app.use(express.json())

// middleware logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// establishes a home page
app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

// establishing our router
app.use("/employees", router);

// Catch-all error handler
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something unexpected went wrong :/");
});