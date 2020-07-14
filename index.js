const express = require("express");
var cors = require("cors");
const repoContext = require("./repository/repository-wrapper.js");
const validators = require("./validators/custom-validations.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => validators.body(req, res, next));

app.listen(3000, function () {
  console.log("Server started. Listening on port 3000.");
});

app.get("/api/movies", (req, res) => {
  let movies = repoContext.movies.findAllMovies();
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  let id = req.params.id;
  let movie = repoContext.movies.findMovieById(id);
  res.send(movie);
});

app.post("/api/movies", (req, res) => {
  let newMovie = req.body;
  let addedMovie = repoContext.movies.createMovie(newMovie);
  res.send(addedMovie);
});

app.put("/api/movies", (req, res) => {
  let movieToUpdate = req.body;
  let updatedMovie = repoContext.movies.updateMovie(movieToUpdate);
  res.send(updatedMovie);
});

app.delete("/api/movies/:id", (req, res) => {
  let id = req.params.id;
  let updatedDataSet = repoContext.movies.deleteMovie(id);
  res.send(updatedDataSet);
});
