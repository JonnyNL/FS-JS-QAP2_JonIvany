// Author: Jonathan Ivany
// Date: 2023-05-31

const fs = require("fs");
const path = require("path");

function writeToLog(logMessage) {
  const logDir = path.join(process.cwd(), "logs");
  const logFileName = getLogFileName();
  const logFilePath = path.join(logDir, logFileName);

  const logEntry = `[${getCurrentDateTime()}] ${logMessage}\n`;

  fs.mkdirSync(logDir, { recursive: true });
  fs.appendFileSync(logFilePath, logEntry);
}

function getLogFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}.log`;
}

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

module.exports = {
  writeToLog,
};
