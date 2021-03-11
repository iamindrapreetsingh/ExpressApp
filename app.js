const fetch = require("node-fetch");
const express = require("express");
const { response } = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Variables used in promises
let jsonResponse;
let repos = [];
let temp;

//Developer Links Array
let developerLinksArray = [];

const githubUrl = "https://api.github.com/";

//Get a developer details
app.get("/api/developers/:id", (req, res) => {
  const developerLinks = developerLinksArray.find(
    (dl) => dl.github_id == req.params.id
  );
  if (!developerLinks) {
    res.status(404).send("User does not exist");
  } else {
    fetch(`${githubUrl}users/${req.params.id}`)
      .then((response) => response.json())
      .then((json) => {
        let object = {
          id: json.id,
          avatar_url: json.avatar_url,
          name: json.name,
          company: json.company,
          blog: json.company,
          location: json.company,
          email: json.email,
          bio: json.bio,
          github_id: developerLinks.github_id,
          linkedin_id: developerLinks.linkedin_id,
          codechef_id: developerLinks.codechef_id,
          hackerrank_id: developerLinks.hackerrank_id,
          twitter_id: developerLinks.twitter_id,
          medium_id: developerLinks.medium_id,
        };
        jsonResponse = object;
        return jsonResponse;
      })
      .then((x) => fetch(`https://api.github.com/users/${req.params.id}/repos`))
      .then((response) => response.json())
      .then((json) => {
        json.forEach((element) => {
          temp = {
            name: element.name,
            html_url: element.html_url,
            description: element.description,
            updated_at: element.updated_at,
          };
          repos.push(temp);
        });
        jsonResponse.repos = repos;
      })
      .then((x) => res.send(jsonResponse));
  }
});

//Add a developer
app.post("/api/developers", (req, res) => {
  const developerLinks = {
    github_id: req.body.github_id,
    linkedin_id: req.body.linkedin_id,
    codechef_id: req.body.codechef_id,
    hackerrank_id: req.body.hackerrank_id,
    twitter_id: req.body.twitter_id,
    medium_id: req.body.medium_id,
  };

  fetch(`${githubUrl}users/${req.body.github_id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if ("message" in json) {
        res.status(400).send("Github username is invalid");
      } else {
        const response = {
          github_id: req.body.github_id,
        };
        developerLinks.avatar_url = json.avatar_url;
        developerLinksArray.push(developerLinks);
        res.status(201).send(response);
      }
    });
});

//Remove a developer
app.delete("/api/developers/:id", (req, res) => {
  if (!developerLinksArray.find((d1) => d1.github_id == req.params.id)) {
    res.status(204).send("No content");
  } else {
    developerLinksArray.pop(
      developerLinksArray.find((d1) => d1.github_id == req.params.id)
    );
    res.status(202).send("Deleted");
  }
});

app.get("/api/developers", (req, res) => {
  let allDevelopers = [];
  developerLinksArray.forEach((element) => {
    temp = {
      github_id: element.github_id,
      avatar_url: element.avatar_url,
    };
    allDevelopers.push(temp);
  });
  res.send(allDevelopers);
});

//This is for test
app.get("/", (req, res) => {
  res.send("Raman");
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
