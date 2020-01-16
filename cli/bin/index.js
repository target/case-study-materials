#!/usr/bin/env node
const yargs = require('yargs')
const commands = require('../lib/commands')

const commandList = Object.keys(commands).map((key) => commands[key])

yargs
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .showHelpOnFail(false)
  .alias('h', 'help')

commandList.forEach((command) => {
  yargs.command(
    command.name,
    command.description,
    command.builder,
    command.handler
  )
})

yargs.argv
