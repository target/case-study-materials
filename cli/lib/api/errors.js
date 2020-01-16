/**
 * A base error
 * @class
 * @extends Error
 */
class BaseError extends Error {

  /**
   * @constructor
   * @param {string} message - error message
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Indicates that a required file could not be found
 * @class
 * @extends BaseError
 */
class MissingFileError extends BaseError {
  
  /**
   * @constructor
   * @param {string} message - error message
   * @param {string} file - path to anticipated file
   */
  constructor(message, file) {
    super(message)
    this.file = file
  }

}

/**
 * Indicates that a required file is invalid
 * @class
 * @extends BaseError
 */
class InvalidFileError extends BaseError {

  /**
   * @constructor
   * @param {string} message - error message
   * @param {string} file - path to invalid file
   */
  constructor(message, file) {
    super(message)
    this.file = file
  }
}

/**
 * Indicates that something went wrong while writing a file to the file system
 * @class
 * @extends BaseError
 */
class WriteError extends BaseError {

  /**
   * @constructor
   * @param {string} message - error message
   * @param {string} path - path to which write was attempted
   */
  constructor(message, path) {
    super(message)
    this.path = path
  }
}

/**
 * Indicates that could not write to specified path because a file/folder already existed at that path
 * @class
 * @extends WriteError
 */
class OverwriteError extends WriteError {

  /**
   * @constructor
   * @param {string} message - error message
   * @param {string} path - path to which write was attempted
   */
  constructor(message, path) {
    super(message, path)
  }
}

/**
 * Indicates that a subprocess terminated with a non-zero exit code
 * @class
 * @extends BaseError
 */
class SubprocessError extends BaseError {

  /**
   * @constructor
   * @param {string} message - error message
   * @param {number} exitCode - the exit code with which the subprocess terminated
   */
  constructor(message, exitCode) {
    super(message)
    this.exitCode = exitCode
  }
}

/**
 * Indicates that an argument did not match requirements
 * @class
 * @extends BaseError
 */
class BadArgumentError extends BaseError {

  /**
   * @constructor
   * @param {string} message - error message
   * @param {*} parameter - parameter name
   * @param {*} type - expected type of argument
   * @param {*} value - value received as argument
   */
  constructor(message, parameter, type, value) {
    super(message)
    this.parameter = parameter
    this.type = type
    this.value = value
  }
}

/**
 * Indicates that a dependency could not be found
 * @class
 * @extends BaseError
 */
class DependencyError extends BaseError {

  /**
   * @constructor
   * @param {string} message - error message
   * @param {string} dependency - name of dependency
   */
  constructor(message, dependency) {
    super(message)
    this.dependency = dependency
  }
}

module.exports = {
  MissingFileError,
  InvalidFileError,
  WriteError,
  OverwriteError,
  BadArgumentError,
  SubprocessError,
  DependencyError,
}
