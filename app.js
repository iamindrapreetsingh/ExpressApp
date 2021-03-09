const { response } = require('express');
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Developer Links Array
const developerLinksArray = []; 




const githubUrl = "https://api.github.com/users/"

app.get('/github/users/:userName', (req, res) => {
 
});

app.get('/', (req, res) => {
 
  res.send("Raman");

});

app.post('/api/developers', (req,res)=>{
  const developerLinks = {
    "github_id": req.body.github_id,
	  "linkedin_id": req.body.linkedin_id,
	  "codechef_id": req.body.codechef_id,
	  "hackerrank_id": req.body.hackerrank_id,
	  "twitter_id": req.body.twitter_id,
	  "medium_id": req.body.medium_id,
  };


  fetch('https://api.github.com/users/' + req.body.github_id)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if('message' in json)
      {
        res.status(400).send("GitHub username is invalid");
      }
      else
      {
        const response = {
          "github_id": req.body.github_id
        };
        developerLinksArray.push(developerLinks);
        res.status(201).send(response);
      }
    });
})

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});