const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const likes = 0;

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  };

  repositories.push(project);

  return response.json(project);

});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs, likes} = request.body;
  const { id } = request.params;
  const projectIndex = repositories.findIndex(project => project.id === id);
  
  if (projectIndex < 0){
    return response.status(400).send();
  }
  const like = repositories[projectIndex].likes;

  const project = {
    id,
    url,
    title,
    techs,
    likes: likes ? like : like
  };

  repositories[projectIndex] = project;

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(project => project.id === id );

  if(projectIndex < 0 ){
    return response.status(400).json({ error: "Project not found !"});
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;
  const projectIndex = repositories.findIndex(project => project.id === id);
  
  if (projectIndex < 0){
    return response.status(400).json({error: "Project not found"});
  }
  const likes = repositories[projectIndex].likes;

  const likesIncrement = repositories[projectIndex].likes = likes + 1;

  return response.json({ likes: likesIncrement});

});

module.exports = app;
