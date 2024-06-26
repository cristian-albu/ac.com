import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

const config: Config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
    },
    moduleNameMapper: {
        "^@/components/(.*)$": "<rootDir>/components/$1",
    },
};

export default createJestConfig(config);
