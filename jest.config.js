module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.vue$": "vue-jest"
    },
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
  ],
    moduleNameMapper: {
      "/^components\/(.*)$/": "<rootDir>/src/components/$1"

    },
    snapshotSerializers: ["jest-serializer-vue"]
  }