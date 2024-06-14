import { defineConfig } from "cypress";
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 20000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  responseTimeout: 20000,
  chromeWebSecurity: false,
  waitForAnimations: true,
  trashAssetsBeforeRuns: true,
  downloadsFolder: 'cypress/downloads',
  animationDistanceThreshold: 50,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reportDir: 'cypress/cucumber_report.*',
    jsonDir: 'json-logs/',
    configFile: 'multi-reporter-config.json',
    html: true,
    json: true,
    code: false,
    overwrite: false,
    reportTitle: 'Technical-tests',
  },
  video: false,
  watchForFileChanges: false,
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on('file:preprocessor', bundler);
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      return config;
    },
    specPattern: 'cypress/features/*.{feature,features}',
    baseUrl: 'https://parabank.parasoft.com',
  },
});
