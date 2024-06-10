import * as fsExtra from 'fs-extra';
const fs = require('fs');
const cypressConfig = require('./cypress.config');

const reportDir = cypressConfig.reporterOptions.jsonDir;

if (fs.existsSync(reportDir)) {
  const reportFiles = `${reportDir}`;
  console.log(`${reportFiles}`);
  fsExtra.emptyDirSync(reportFiles);
}
