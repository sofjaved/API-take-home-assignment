const csvToJson = require('csvtojson');

//helper functions:

const getPackageInfo = async (packageName, version) => {
  let vulnerabilities = await getVulnerabilities(packageName, version);
  let result = {
    name: packageName,
    version: version,
    license: '',
    vulnerabilities: vulnerabilities
  };
  const licenses = await csvToJson({
    trim:true
  }).fromFile('./data/licenses.csv');
  for(let i = 0; i < licenses.length; i++) {
    let package = licenses[i];
    if(package.packageName === packageName) {
      result.license = package.license
    }
  }
  return result;
}


const getVulnerabilities = async (packageName, version) => {
  let result = [];
  const vulnerabilities = await csvToJson({
    trim:true
  }).fromFile('./data/vulnerabilities.csv');

  for(let i = 0; i < vulnerabilities.length; i++) {
    let vulnerability = vulnerabilities[i];
    if(vulnerability.packageName === packageName && vulnerability.packageVersion === version) {
      let date = new Date(vulnerability.timestamp * 1000);
      result.push(
        {
          id: vulnerability.id,
          description: vulnerability.description,
          created: date
        }
      );
    }
  }
  return result;
}


module.exports = getPackageInfo;
