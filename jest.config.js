export default {
  setupFiles: ["<rootDir>/src/setupGlobals.js"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.jsx"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
