// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');
const { MemoryLeakReporter } = require('./memoryLeakReporter');
const { writeFileSync } = require('fs');
const lcovResultMerger = require('lcov-result-merger');

class FileWritingMemoryLeakReporter extends MemoryLeakReporter {
  jasmineDone() {
    const leaks = this.getMemoryLeaks();
    const outputFile = path.resolve(__dirname, 'coverage', 'memory-leaks.lcov');
    writeFileSync(outputFile, leaks);
  }
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/mem-test'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    browsers: ['Chrome'],
    restartOnFileChange: true
  });

  // Add the custom reporter to Jasmine within the config.set function
  config.afterMiddleware = function (config) {
    config.afterMiddleware = ['custom'];
    config.middleware = ['custom'];
    config.plugins.push({
      'middleware:custom': function () {
        return function (req, res, next) {
          jasmine.getEnv().addReporter(new FileWritingMemoryLeakReporter(0.1)); // Set the threshold value, e.g., 1 MB
          next();
        };
      },
    });
  };

  // // Add the custom reporter to Jasmine
  // jasmine.getEnv().addReporter(new MemoryLeakReporter(0.1)); // Set the threshold value, e.g., 1 MB
};
