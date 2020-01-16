const fs = require('fs')
const path = require('path');
const utils = require('../utils')
const Handlebars = require('handlebars')

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

const createFolderTemplate = (templateComposer) => ({
  write: async (targetPath, context) => {
    await utils.ensureDirAsync(targetPath)
    let templates = templateComposer(context)
    for (const key of Object.keys(templates)) {
      await templates[key].write(path.join(targetPath, key), context)
    }
  }
})

const createCloneTemplate = (sourcePath) => ({
  write: async (targetPath) => {
    return utils.copyAsync(sourcePath, targetPath)
  }
})

const createHbsTemplate = (sourcePath) => ({
  write: async (targetPath, context) => {
    const file = await utils.readFileAsync(sourcePath)
    const hbsTemplate = Handlebars.compile(file.toString())
    const rendered = hbsTemplate(context)
    return utils.writeFileAsync(targetPath, rendered)
  }
})

module.exports = {
  createCloneTemplate,
  createHbsTemplate,
  createFolderTemplate,
}
