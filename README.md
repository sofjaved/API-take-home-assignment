# API-take-home-assignment
A take-home API exercise for a job interview process.

Sofia Javed\
Feb 2, 2021 (2-5 pm EST)

To test the script in app.js:

- git clone [https://github.com/sofjaved/API-take-home-assignment](https://github.com/sofjaved/API-take-home-assignment)
- npm install
- npm start

- a server will run on port 3030.

- type into the browser's address bar: http://localhost:3030/package/health/:packagename/:version with the requested package name and version, and you will recieve the requested data from the csv files in JSON format. For further testing, you may add data as needed to the csv files in this repository.
- type into the browser's address bar: http://localhost:3030/package/releases/:packagename with the requested package name, and you will recieve the requested data from the NPM registry in JSON format.


Assignment:
Write two API endpoints to expose requested information about software packages.

The first endpoint should accept GET requests to urls of the form /package/health/:packagename/:version where :packagename is the name of the package (something like axios, firebase, bulma, github-api, etc) and :version is the specific version to get data about. The response should be a json dictionary for that package containing information about the license and security vulnerabilities in that version of that package.

The second endpoint should accept GET requests to urls of the form /package/releases/:packagename where :packagename is again the name of the package. Get this information by making an API call to the NPM registry which is available with a GET request to https://registry.npmjs.org/:packagename. That call will return JSON as described in depth in [their documentation] (https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md). Responses should include the name of the package, the number of the 'latest'/most recently released version, and a list of 'releases' (all version numbers).

