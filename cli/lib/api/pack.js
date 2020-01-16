const path = require('path');
const dotenv = require('dotenv');
const { struct } = require('superstruct')
const fs = require('fs')
const utils = require('../utils')
const errors = require('./errors')

const validateArgs = struct({
  sourcePath: 'string',
  destinationPath: 'string',
})

/** 
 * Packs application at sourcePath and writes it to the destinationPath
 * @param {string} sourcePath - path of application to pack
 * @param {string} destinationPath - path to write packed application
 * @returns {Promise<string>} path at which packed application was written
 * @throws {BadArgumentError}
 * @throws {OverwriteError}
 * @throws {WriteError}
 * @throws {MissingFileError}
 */
const pack = async (sourcePath, destinationPath) => {

  try {
    validateArgs({
      sourcePath,
      destinationPath,
    })
  }
  catch(e) {
    throw new errors.BadArgumentError(e.message, e.path, e.type, e.value)
  }

  sourcePath = path.resolve(sourcePath)
  destinationPath = path.resolve(destinationPath)

  if (await utils.existsAsync(destinationPath)) {
    throw new errors.OverwriteError('This operation would overwrite an existing file/directory: ' + destinationPath, destinationPath)
  }

  const requiredFiles = ['.casestudy']

  for (const f of requiredFiles) {
    const filePath = path.resolve(sourcePath, f)
    if (! (await utils.existsAsync(filePath))) {
      throw new errors.MissingFileError(`Could not find required file: ${filePath}`, filePath)
    }
  }

  try {
    return utils.zipAsync(sourcePath, destinationPath)
  }
  catch(e) {
    throw new errors.WriteError('Failed to write zip')
  }
}

module.exports = pack
