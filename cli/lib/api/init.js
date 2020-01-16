const path = require('path');
const ReactAppTemplate = require('./templates/react/AppTemplate')
const SpringBootAppTemplate = require('./templates/java-spring-boot/AppTemplate')
const utils = require('../utils')
const config = require('./config')
const { struct } = require('superstruct')
const constants = require('../constants')
const packageJson = require('../../package.json')
const errors = require('./errors')

const validateServices = struct.list(
  [struct.enum(constants.serviceOptions)]
)

const validateDatabase = struct.optional(
  struct.enum(['postgres', 'mongo'])
)

const validateBase = struct.enum(constants.baseOptions)

const validateInitOptions = struct({
  services: validateServices,
  database: validateDatabase,
})

const validateInitArgs = struct({
  base: validateBase,
  destinationPath: 'string',
  options: validateInitOptions,
})

const appTemplates = {
  'react': ReactAppTemplate,
  'java-spring-boot': SpringBootAppTemplate,
}

/** 
 * Generates a new application at the destinationPath
 * @param {string} base - application stack ('react', 'java-spring-boot')
 * @param {string} destinationPath - path to write application
 * @param {object} options - method options
 * @param {string[]} otpions.services - list of services to stand up along side application
 * @returns {Promise<string>} path at which application was written
 * @throws {BadArgumentError}
 * @throws {OverwriteError}
 * @throws {WriteError}
 */
const init = async (
  base,
  destinationPath,
  {
    services=[],
    database
  } = {}
) => {

  try {
    validateInitArgs({
      base,
      destinationPath,
      options: {
        services,
        database
      }
    })
  }
  catch(e) {
    throw new errors.BadArgumentError(e.message, e.path, e.type, e.value)
  }

  destinationPath = path.resolve(destinationPath)

  if (await utils.existsAsync(destinationPath)) {
    throw new errors.OverwriteError('This operation would overwrite an existing file/directory: ' + destinationPath, destinationPath)
  }

  const AppTemplate = appTemplates[base]

  let contextObj = {
    services: config.services.filter(
      service => services.includes(service.name) || service.name === 'version_api'
    ),
    base: base,
    cliVersion: packageJson.version
  }

  try {
    await AppTemplate.write(destinationPath, contextObj)
  }
  catch(e) {
    // Cleanup the partitally written application
    await utils.removeAsync(destinationPath)
    throw new errors.WriteError('Could not initialize application', destinationPath)
  }

  return destinationPath
}

module.exports = init
