// Author: Jonathan Ivany
// Date: 2023-05-31

const fs = require("fs");
const path = require("path");

// Function to write log message to file
function writeToLog(logMessage) {
  // Get the log directory path
  const logDir = path.join(process.cwd(), "logs");

  // Generate the log file name based on the current date
  const logFileName = getLogFileName();

  // Combine the log directory path and file name to get the full log file path
  const logFilePath = path.join(logDir, logFileName);

  // Create the log entry with the current date and time
  const logEntry = `[${getCurrentDateTime()}] ${logMessage}\n`;

  // Create the log directory if it doesn't exist, including any necessary parent directories
  fs.mkdirSync(logDir, { recursive: true });

  // Append the log entry to the log file
  fs.appendFileSync(logFilePath, logEntry);
}

// Function to generate the log file name based on the current date
function getLogFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}.log`;
}

// Function to get the current date and time in the desired format
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Export the writeToLog function for external use
module.exports = {
  writeToLog,
};
