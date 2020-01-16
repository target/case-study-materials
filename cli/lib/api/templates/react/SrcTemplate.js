var path = require('path');
const { createFolderTemplate, createCloneTemplate, createHbsTemplate } = require('../../scaffold')

const RESOURCES_PATH = path.join(__dirname, 'resources')

const IndexTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'src/index.js')
)

const AppComponentTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'src/App')
)

const SrcTemplate = createFolderTemplate((context) => {
  return {
    'index.js': IndexTemplate,
    'App': AppComponentTemplate,
  }
})

module.exports = SrcTemplate
