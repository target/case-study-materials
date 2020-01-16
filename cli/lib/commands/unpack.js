const path = require('path');
const api = require('../api')

const unpack = {
  name: 'unpack',
  description: 'Unpack a packed application',
  builder: (yargs) => {
    yargs.option('source', {
      describe:  `Path of file to unpack`,
      type: 'string', /* array | boolean | string */
      demand: '--source is required',
    })
    yargs.option('destination', {
      describe:  `Path to write unpacked application`,
      type: 'string', /* array | boolean | string */
      demand: '--destination is required',
    })
  },
  handler: (argv) => {
    return api.unpack(
      argv.source,
      argv.destination
    )
      .then((location) => {
        console.log(`Unpacked successfully: ${location}`)
      })
      .catch((e) => {
        console.log('Could not unpack.')
        if (e instanceof api.errors.OverwriteError) {
          console.error(e.message)
        }
      })
  }
}

module.exports = unpack
