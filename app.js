const express = require("express");
const app = express();
const fetch = require("node-fetch");
const getPackageInfo = require("./helperFunctions.js");

//first endpoint:

app.get("/package/health/:packagename/:version", async (req, res, next) => {
  try {
    let package = req.params.packagename;
    let version = req.params.version;
    let result = await getPackageInfo(package, version)
    res.send(result);
  } catch (error) {
    console.error(error);
  }
})

// second endpoint:

app.get("/package/releases/:packagename", async (req, res, next) => {
  try {
    let url = "https://registry.npmjs.org/" + req.params.packagename;
    let result = await fetch(url);
    result = await result.json();
    let name = result.name;
    let releases = Object.keys(result.versions);
    let diff = Infinity;
    let latest;
    for(let key in result.time) {
      if(key !== 'modified' && key !== 'created') {
        let today = new Date();
        let releaseDate = new Date(result.time[key])
        if (today - releaseDate < diff) {
          diff = today - releaseDate;
          latest = key;
        }
      }
    }
    let response = {
      name: name,
      latest: latest,
      releases: releases
    };
    res.send(response);
  } catch (error) {
    console.error(error);
  }
})

// server:

app.listen(3030, () => {
  console.log("Server running on port 3030");
 });
