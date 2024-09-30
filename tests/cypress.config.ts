import { defineConfig } from "cypress";
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
// @ts-ignore
import webpack from '@cypress/webpack-preprocessor';
import path from "path";
const fs= require("fs");

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
  video: false,
  watchForFileChanges: false,
  e2e: {
    specPattern: 'cypress/features/*.{feature,features}',
    baseUrl: 'https://parabank.parasoft.com',
    async setupNodeEvents(on, config) {

      const threadIndex = process.env.CYPRESS_THREAD;
      if(threadIndex) {
        config.env['jsonOutput'] = path.resolve(__dirname, `cypress/results/cucumber-report-${new Date().getTime()}.json`)
      }

      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor', file => {
          return webpack({
            webpackOptions: {
              resolve: {
                extensions: ['.js','.ts', '.json'],
              },
              module: {
                rules: [
                  {
                    test: /\.ts?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                  },
                  {
                    test: /\.feature$/,
                    use: [
                      {
                        loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                        options: config
                      }
                    ]
                  }
                ],
              },
            },
          })(file);
      });
      on('after:run', async (results) => {
        if(results) {
          await afterRunHandler((config));
          fs.writeFile('cypress/execution-time.json', JSON.stringify(results));
        }
      });
      return config;
    },
  },
});
