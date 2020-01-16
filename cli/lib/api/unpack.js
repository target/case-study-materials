const path = require('path');
const dotenv = require('dotenv');
const { struct } = require('superstruct')
const fs = require('fs')
const utils = require('../utils')
const unzipper = require('unzipper')
const errors = require('./errors')


const validateArgs = struct({
  sourcePath: 'string',
  destinationPath: 'string',
})

/** 
 * Unpacks application at sourcePath and writes it to the destinationPath
 * @param {string} sourcePath - path of packed application to unpack
 * @param {string} destinationPath - path to write unpacked application
 * @returns {Promise<string>} path at which unpacked application was written
 * @throws {BadArgumentError}
 * @throws {OverwriteError}
 * @throws {WriteError}
 */
const unpack = async (sourcePath, destinationPath) => {

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

  try {
    const d = await unzipper.Open.file(sourcePath)
    await d.extract({path: destinationPath})
  }
  catch(e) {
    throw new errors.WriteError('Failed to unpack application')
  }

  return destinationPath
}

module.exports = unpack
