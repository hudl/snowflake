const csv = require('csvtojson');
const writeFile = require('fs').writeFile;
const path = require('path');

const trimObj = obj => {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(
      function(acc, key) {
        acc[key.trim().toLowerCase()] =
          typeof obj[key] == 'string' ? obj[key].trim() : trimObj(obj[key]);
        return acc;
      },
      Array.isArray(obj) ? [] : {}
    );
  };

const processData = () => {
  if (process.argv[2] === undefined) {
    console.log('Missing data file to parse');
    return;
  }

  const fileLocation = process.argv[2];
  csv({
    colParser:{
        "KNOWLEDGE":"number",
        "COMMUNICATION":"number",
        "GSD":"number",
        "INNOVATION":"number",
        "COMPLEXITY":"number",
        "OWNERSHIP":"number",
        "IMPACT":"number",
        "Score":"number",
        "level":"number",
    }})
    .fromFile(fileLocation)
    .then(roles => {
        roles = roles.map(role => {
            const trimmedRole = trimObj(role);
            return trimmedRole;
          });
      writeFile(
        `roles.json`,
        JSON.stringify({ hudlRoles: roles }),
        error => {
          console.log('Parsed CSV to JSON');
        }
      );
    });
};

processData();