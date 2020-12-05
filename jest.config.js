module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^(components|features|lib|mocks|test)/(.*)$": "<rootDir>/src/$1/$2",
    "^(test)$": "<rootDir>/src/$1",
    "^(api)$": "<rootDir>/__generated__/$1",
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup-env.ts"],
  coveragePathIgnorePatterns: ["src/test", "__generated__"],
};
