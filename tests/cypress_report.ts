const report = require('multiple-cucumber-html-reporter');
const screenshot = require('./attchScreenshotsToReport');

screenshot.prepareScreenshots().then(() =>
  report.generate({
    jsonDir: 'json-logs/',
    reportPath: 'cypress/cucumber_report.html',
    reportTitle: 'Technical-test',
    customData: {
      title: 'Run info',
      data: [
        { label: 'Project', value: 'LA-Technical-test' },
        { label: 'Release', value: '1.0.0' },
      ],
    },
  }),
);
