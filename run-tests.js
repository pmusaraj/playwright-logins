#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// Initialize log file (this resets it on each run)
const logPath = path.join(__dirname, "test-results.log");
fs.writeFileSync(logPath, "");

// Read and parse CSV
const csvPath = path.join(__dirname, "site-list.csv");
const csvContent = fs.readFileSync(csvPath, "utf-8");
const lines = csvContent.trim().split("\n");

// Parse CSV (simple parser for comma-separated values with quotes)
// CSV needs columns for "forum_name" and "url"
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);

  return result;
}

// Parse header
const headers = parseCSVLine(lines[0]);
const forumNameIndex = headers.indexOf("forum_name");
const urlIndex = headers.indexOf("url");

// Process each row
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  const forumName = row[forumNameIndex];
  const url = row[urlIndex];

  // Skip if URL is missing
  if (!url || url.trim() === "") {
    continue;
  }

  try {
    // Run the test with environment variables
    const output = execSync(
      `FORUM_NAME="${forumName}" SITE_URL="${url}" npx playwright test tests/facebook-login.spec.ts`,
      {
        env: {
          ...process.env,
          FORUM_NAME: forumName,
          SITE_URL: url,
        },
        encoding: "utf-8",
      }
    );

    // Output success with checkmark
    const displayName = `${url} - ${forumName}`;
    const resultMessage = `\n${displayName} ☑️`;

    // Write to log file
    // fs.appendFileSync(logPath, output);
    fs.appendFileSync(logPath, resultMessage);

    console.log(resultMessage);
  } catch (error) {
    // Test failed, but continue with next site
    const displayName = `${url} - ${forumName}`;
    const resultMessage = `\n${displayName} ❌`;

    // Write output and error to log file
    // if (error.stdout) fs.appendFileSync(logPath, error.stdout);
    // if (error.stderr) fs.appendFileSync(logPath, error.stderr);
    fs.appendFileSync(logPath, resultMessage);

    console.log(resultMessage);
  }
}
