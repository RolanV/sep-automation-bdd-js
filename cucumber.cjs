const fs = require("node:fs");
const path = require("node:path");

// Load a local .env if one exists, so credentials can come from a gitignored
// file rather than only the VS Code integrated terminal. Values already in the
// environment are NOT overwritten, so the shell keeps precedence. Nothing is
// logged. Uses Node built-in loadEnvFile - no third-party package.
const envFile = path.join(__dirname, ".env");
if (fs.existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

/**
 * This configuration object is used to set up and customize the Cucumber.js testing framework.
 * It provides options for parallel execution, paths to feature files, step definitions, hooks,
 * report formats, and snippet interface.
 */
module.exports = {
  
  default: {
    /**
     * Number of workers to run in parallel.
     * @type {number}
     */
    parallel: 5,

    /**
     * Glob patterns for feature files.
     * @type {string[]}
     */
    paths: ["./features/**/*.feature"], // path to the feature files

    /**
     * Glob patterns for step definition files and hooks.
     * @type {string[]}
     */
    import: ["./steps/**/*.js", "./hooks/**/*.js"], // path to the step definitions and hooks

    /**
     * Report formats to be generated.
     * @type {string[]}
     */
    format: [
      "progress-bar",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
    ],

    /**
     * Additional options for report formats.
     * @type {object}
     * @property {string} snippetInterface - The interface for generating snippets.
     */
    formatOptions: { snippetInterface: "async-await" },
  },
  
};
