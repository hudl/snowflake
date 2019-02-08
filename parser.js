const csv = require('csvtojson');
const writeFile = require('fs').writeFile;
const path = require('path');
const config = require('./config');
const { google } = require('googleapis');
// const AWS = require('aws-sdk');
// const s3 = new AWS.s3();

const processData = () => {
  const sheets = google.sheets({ version: 'v4' });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: config.spreadsheetId,
      range: 'Roles!A:K',
      key: config.apiKey
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const data = res.data.values;
      const objectKeys = data.shift().map(header => header.toLowerCase());
      const parsedRoles = data.map(rawRole => {
        let role = {};
        objectKeys.forEach((key, index) => {
          role[key] = index > 1 ? parseInt(rawRole[index]) : rawRole[index];
        });
        return role;
      });
      writeFile(
        `static/roles.json`,
        JSON.stringify({ hudlRoles: parsedRoles }),
        error => {
          console.log('Parsed CSV to JSON');
        }
      );
    }
  );
};

processData();
