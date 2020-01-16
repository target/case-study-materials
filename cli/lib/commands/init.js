const path = require('path');
const api = require('../api')
const constants = require('../constants')

const init = {
  name: 'init',
  description: 'Generate an application',
  builder: (yargs) => {
    yargs.option('base', {
      describe:  `Tech stack to use as the app's foundation`,
      type: 'string', /* array | boolean | string */
      demand: `--base is required`,
      choices: constants.baseOptions
    })
    yargs.option('destination', {
      describe:  `The path where the application should be written`,
      type: 'string', /* array | boolean | string */
      demand: '--destination is required',
      alias: 'app-name'
    })
    // yargs.option('id', {
    //   describe:  `ID to uniquely identify your application`,
    //   type: 'string', /* array | boolean | string */
    //   demand: '--id is required',
    // })
    // yargs.option('database', {
    //   describe:  `Database service to include`,
    //   type: 'string', /* array | boolean | string */
    // })
    yargs.option('services', {
      describe:  `List of http services to include`,
      type: 'array', /* array | boolean | string */
      default: [],
      choices: constants.serviceOptions
    })
  },
  handler: async (argv) => {
    await api.init(
      argv.base,
      argv.destination,
      {
        services: argv.services,
      }
    )
    .then((location) => {
      console.log('App created successfully.')
      console.log('Access it at: ' + location)
    })
    .catch((e) => {
      console.log('Could not create app.')
      console.log(e.message)
    })
  }
}

module.exports = init
