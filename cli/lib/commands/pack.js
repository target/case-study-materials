const path = require('path');
const api = require('../api')

const pack = {
  name: 'pack',
  description: 'Pack application into single file',
  builder: (yargs) => {
    yargs.option('source', {
      describe:  `Path of directory to pack`,
      type: 'string', /* array | boolean | string */
    })
    yargs.option('destination', {
      describe:  `Path to write packed application`,
      type: 'string', /* array | boolean | string */
    })
  },
  handler: (argv) => {
    const defaultSource = process.cwd()
    const source = path.resolve(argv.source || defaultSource)
    const defaultDestinationFilename = path.basename(source) + '.zip'
    const destination =  path.resolve(argv.destination || defaultDestinationFilename)

    return api.pack(
      source,
      destination,
    )
      .then((location) => {
        console.log(`Packed successfully: ${location}`)
      })
      .catch((e) => {
        console.error('Could not pack.')
        if (e instanceof api.errors.MissingFileError) {
          console.error('It seems the specified project was not generated with this tool.')
        }
        if (e instanceof api.errors.OverwriteError) {
          console.error(e.message)
        }
      })
  }
}

module.exports = pack
