var path = require('path');
const { createFolderTemplate, createCloneTemplate, createHbsTemplate } = require('../../scaffold')
const SrcTemplate = require('./SrcTemplate')

const RESOURCES_PATH = path.join(__dirname, 'resources')


const PackageJsonTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'package.json')
)

const PublicTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'public')
)

const BaseYmlTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, 'docker-compose.base.yml.hbs')
)

const AppYmlTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, 'docker-compose.app.yml.hbs')
)

const TestYmlTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, 'docker-compose.test.yml.hbs')
)

const DockerfileTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'Dockerfile')
)

const DockerIgnoreTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, '.dockerignore')
)

const ReadmeTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, 'README.md.hbs')
)

const NginxConfTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, 'nginx.conf.hbs')
)

const DotCaseStudyTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, '.casestudy.hbs')
)

const AppTemplate = createFolderTemplate((context) => {
  return {
    'public': PublicTemplate,
    'src': SrcTemplate,
    'Dockerfile': DockerfileTemplate,
    'docker-compose.base.yml': BaseYmlTemplate,
    'docker-compose.app.yml': AppYmlTemplate,
    'docker-compose.test.yml': TestYmlTemplate,
    '.dockerignore': DockerIgnoreTemplate,
    'package.json': PackageJsonTemplate,
    'README.md': ReadmeTemplate,
    'nginx.conf': NginxConfTemplate,
    '.casestudy': DotCaseStudyTemplate,
  }
})

module.exports = AppTemplate
