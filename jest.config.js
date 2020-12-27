module.exports = {
    transform: {
        '^.+\\.svelte$': 'svelte-jester',
        '^.+\\.js$': ['babel-jest',{ configFile: './config/babel-jest.config.js' }],
        '^.+\\.ts$': ['babel-jest',{ configFile: './config/babel-jest.config.js' }],
    },
    moduleFileExtensions: ['js', 'svelte', 'ts'],
    coveragePathIgnorePatterns: ["<rootDir>/src/common/clsx", "/assets/"]
}