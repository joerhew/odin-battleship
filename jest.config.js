module.exports = {
  modulePaths: ['/shared/vendor/modules'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  verbose: true,
  bail: 1,
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js'
  }
}