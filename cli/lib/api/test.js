const path = require('path')
const { struct } = require('superstruct')
const createDockerComposeClient = require('./createDockerComposeClient')
const utils = require('../utils')
const errors = require('./errors')

const validateArgs = struct({
  appPath: 'string',
})

/** 
 * Tests application at appPath via docker-compose
 * @param {string} appPath - path of application to test
 * @returns {Promise<number>} - exit code (0 when resolved)
 * @throws {BadArgumentError}
 * @throws {MissingFileError}
 * @throws {SubprocessError}
 * @throws {DependencyError}
 */
const test = async (appPath) => {

  try {
    validateArgs({
      appPath,
    })
  }
  catch(e) {
    throw new errors.BadArgumentError(e.message, e.path, e.type, e.value)
  }

  const BASE_YML_PATH = path.join(appPath, 'docker-compose.base.yml')
  const TEST_YML_PATH = path.join(appPath, 'docker-compose.test.yml')

  const requiredFiles = [BASE_YML_PATH, TEST_YML_PATH]

  for (const filePath of requiredFiles) {
    if (! (await utils.existsAsync(filePath))) {
      throw new errors.MissingFileError(`Could not find required file: ${filePath}`, filePath)
    }
  }

  const dockerComposeClient = createDockerComposeClient([BASE_YML_PATH, TEST_YML_PATH])

  return dockerComposeClient.up({
    exitCodeFrom: 'test'
  })

}

module.exports = test
