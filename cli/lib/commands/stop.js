const path = require('path');
const api = require('../api')

const stop = {
  name: 'stop',
  description: 'Stop any running services',
  builder: (yargs) => {

  },
  handler: (argv) => {
    return api.stop(
      process.cwd()
    )
      .then(() => {
        console.log('Services stopped')
      })
      .catch((e) => {
        console.log('Could not stop services')
        if (e instanceof api.errors.DependencyError) {
          console.log(e.message)
        }
        if (e instanceof api.errors.BadArgumentError) {
          console.log(e.message)
        }
        if (e instanceof api.errors.MissingFileError) {
          console.log(e.message)
        }
        if (e instanceof api.errors.SubprocessError) {
          console.log(e.message)
          process.exit(e.exitCode)
        }
        process.exit(1)
      })
  }
}

module.exports = stop
