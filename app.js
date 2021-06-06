const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//developer websites URL
const linekdinURL = "https://www.linkedin.com/in/";
const codechefURL = "https://www.codechef.com/users/";
const hackerrankURL = "https://www.hackerrank.com/";
const twitterURL = "https://www.twitter.com/";
const mediumURL = "https://www.medium.com/@";

//Github Public APIs URL :
const githubAPIURL = "https://api.github.com/";

//Variables used in promises
let jsonResponse;
let repos = [];
let temp;

//Developer Links Array
let developerLinksArray = [
  {
    github_id: "iamindrapreetsingh",
    avatar_url: "https://avatars.githubusercontent.com/u/51911982?v=4",
    linkedin_id: `${linekdinURL}indrapreet`,
    codechef_id: `${codechefURL}iamindrapreetsingh`,
    hackerrank_id: `${hackerrankURL}iamindrapreetsingh`,
    twitter_id: `${twitterURL}iamindrapreetsingh`,
    medium_id: `${mediumURL}iamindrapreetsingh`,
  },
];

//Get a developer details
app.get("/api/developers/:id", (req, res) => {
  repos = [];
  const developerLinks = developerLinksArray.find(
    (dl) => dl.github_id == req.params.id
  );
  if (!developerLinks) {
    res.status(404).send("User does not exist");
  } else {
    fetch(`${githubAPIURL}users/${req.params.id}`)
      .then((response) => response.json())
      .then((json) => {
        let object = {
          id: json.id,
          avatar_url: json.avatar_url,
          name: json.name,
          company: json.company,
          blog: json.blog,
          location: json.location,
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
      .then((x) => fetch(`${githubAPIURL}users/${req.params.id}/repos`))
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
  if (!req.body.github_id) {
    res.send("Github Id is empty!!");
    return;
  }

  const developerLinks = {
    github_id: `${req.body.github_id}`,
    linkedin_id: `${linekdinURL}${req.body.linkedin_id}`,
    codechef_id: `${codechefURL}${req.body.codechef_id}`,
    hackerrank_id: `${hackerrankURL}${req.body.hackerrank_id}`,
    twitter_id: `${twitterURL}${req.body.twitter_id}`,
    medium_id: `${mediumURL}${req.body.medium_id}`,
  };

  if (
    developerLinksArray.find((d1) => d1.github_id == developerLinks.github_id)
  ) {
    res.status(409).send("User with the same GithubId present!!");
    return;
  }

  const url = `${githubAPIURL}users/${req.body.github_id}`;

  fetch(url)
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
  res.send("API is running!!!");
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
