var reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs');

const data = fs.readFileSync('cypress/execution-time.json', { encoding: 'utf8' , flags: 'r' });
const runInfos = JSON.parse(data);
const startTime = new Date(runInfos.startedTestsAt);
const endTime = new Date(runInfos.endedTestsAt);
console.log(startTime, endTime);
const diff = endTime.getTime() - startTime.getTime();
console.log('difference', diff)
const duration  = new Date(diff).toISOString().substring(11,19);

const options = {
    jsonDir: './cypress/results/',
    reportPath: './cypress/results',
    pageTitle: 'Technical-test',
    reportName: 'Technical-test',
    metadata: {
        browser: {
            name : 'chrome',
            version: '1.0.0',
        },
        device: 'Desktop',
        platform: {
            name: 'ubuntu',
            version: '20',
        },
    },
    customData: {
        title: 'Technical-test',
        data: [
            { label: 'Technical-test' , value: 'Technical-test' },
            { label: 'suite execution start time', value: new Date(runInfos.startedTestsAt).toLocaleString() },
            { label: 'suite execution end time', value: new Date(runInfos.endedTestsAt).toLocaleString() },
            { label: 'Total duration', value: duration },
        ]
    },
    reportSuiteAsScenarios: true,
    scenarioTimeStamp:true,
    launceReport: true,
    failedSummaryReport: true,
    displayDuration: true
};

reporter.generate(options);
