/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/lib/", "/types/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
