const fs = require("fs");
const packageJson = require("./package.json");

const versionFile = `src/environments/version.ts`;

const content = `
export const version = '${packageJson.version}';
`;

fs.writeFileSync(versionFile, content);
