const fs = require("fs");

const indexJs = fs.readFileSync("./build/index.js", "utf-8");

module.exports = indexJs;
