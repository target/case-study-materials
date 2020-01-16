const path = require('path');
const api = require('../api')

const run = {
  name: 'run',
  description: 'Run application',
  builder: (yargs) => {

  },
  handler: (argv) => {
    const source = process.cwd()

    process.on('SIGINT', async () => {
      await api.stop(source)
      process.exit()
    });

    return api.run(source)
      .then(() => {
        console.log('Run complete')
      })
      .catch((e) => {
        console.log('Exiting App')
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

module.exports = run
