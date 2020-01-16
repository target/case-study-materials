const { spawn } = require('child_process');
const errors = require('./errors')

const spawnBoundProcess = async (
  command,
  args,
) => {

  console.log('\n' + 'Executing: ' + [command, ...args].join(' ') + '\n')

  const subProcess = spawn(command, args);

  //bind stdout
  subProcess.stdout.on('data', (data) => {
    process.stdout.write(String(data))
  });

  //bind stderr
  subProcess.stderr.on('data', (data) => {
    process.stderr.write(String(data))
  });

  // resolve when finished
  return new Promise((resolve, reject) => {

    subProcess.on('error', (err) => {
      reject(new errors.DependencyError(`Could not find dependency: ${command}`, command))
    });

    subProcess.on('exit', (code) => {
      if (code) {
        reject(new errors.SubprocessError(`Subprocess terminated with exit code ${code}`, code))
      }
      else {
        resolve(code)
      }
    });
  })
}

const createDockerComposeClient = (files) => {
  const COMMAND = `docker-compose`

  const globalOptions = []

  files.forEach((file) => {
    globalOptions.push('-f')
    globalOptions.push(file)
  })

  return {
    up: async ({
      build = true,
      abortOnContainerExit = true,
      exitCodeFrom = ''
    } = {}) => {

      const args = [...globalOptions, 'up']

      if (build) {
        args.push('--build')
      }
      if (abortOnContainerExit) {
        args.push('--abort-on-container-exit')
      }
      if (exitCodeFrom) {
        args.push('--exit-code-from')
        args.push(exitCodeFrom)
      }

      return spawnBoundProcess(COMMAND, args);
    },
    down: async ({
      volumes = true,
    } = {}) => {

      const args = [...globalOptions, 'down']

      if (volumes) {
        args.push('-v')
      }

      return spawnBoundProcess(COMMAND, args);
    },
  }
}

module.exports = createDockerComposeClient
