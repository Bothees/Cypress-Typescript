const fs = require('fs-extra');
const path = require('path');

const cucumberJsonDir = '/cypress/cucumber-json';
const screenshotsDir = '/cypress/screenshots/features';

const featureToFileMap = {};
const cukeMap = {};
const jsonNames = {};

const jsonPath = path.join(__dirname, cucumberJsonDir);
console.log('jsonPath',jsonPath);
const screenshotsPath = path.join(__dirname, screenshotsDir);

module.exports.prepareScreenshots = async function prepareScreenShots() {
  fs.readdirSync(jsonPath).forEach(file => {
    const json = JSON.parse(fs.readFileSync(path.join(jsonPath, file)).toString());
    const feature = json[0].uri;
    jsonNames[feature] = file;
    cukeMap[feature] = json;
    featureToFileMap[feature] = file;
  });

  if (fs.existsSync(screenshotsPath)) {
    const failingFeatures = fs.readdirSync(screenshotsPath);
    failingFeatures.forEach(feature => {
      const screenshots = fs.readdirSync(path.join(screenshotsPath, feature));
      screenshots.forEach(screenshot => {
        let myScenario;
        const start = screenshot.indexOf('--') + 1;
        const end = screenshot.indexOf('(example');
        const scenarioName = screenshot.slice(start, end).trim();

        if (cukeMap[feature] !== undefined) {
          myScenario = cukeMap[feature][0].elements.find(e => e.name === screenshot);
          if (myScenario === undefined) {
            const start2 = screenshot.indexOf('--') + 2;
            const end2 = screenshot.indexOf('(failed');
            const scenarioName2 = screenshot.slice(start2, end2).trim();
            myScenario = cukeMap[feature][0].elements.find(e => e.name === scenarioName2);
          }
          if (myScenario !== undefined && myScenario.steps !== undefined) {
            const myStep = myScenario.steps.find(step => step.result.status !== 'passed');
            if (myStep !== undefined) {
              const data = fs.readFileSync(path.join(screenshotsPath, feature, screenshot));
              if (data) {
                const base64Image = Buffer.from(data, 'binary').toString('base64');
                myStep.embeddings = [];
                myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
              }
            }
          } else {
            console.log(`scenarioName : ${scenarioName}`);
            console.log(`screenshot : ${screenshot}`);
          }

          // write me back out again
          fs.writeFileSync(path.join(jsonPath, jsonNames[feature]), JSON.stringify(cukeMap[feature], null, 2));
        }
      });
    });
  }
};
