var path = require('path');
const { createFolderTemplate, createCloneTemplate, createHbsTemplate } = require('../../scaffold')

const RESOURCES_PATH = path.join(__dirname, 'resources')


const SrcTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'src')
)

const BuildGradleTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'build.gradle')
)

const GradlewTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'gradlew')
)

const GradleTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'gradle')
)

const GradlewBatTemplate = createCloneTemplate(
  path.join(RESOURCES_PATH, 'gradlew.bat')
)

const ReadmeTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, 'README.md.hbs')
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

const NginxConfTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, 'nginx.conf.hbs')
)

const DotCaseStudyTemplate = createHbsTemplate(
  path.join(RESOURCES_PATH, '.casestudy.hbs')
)

const AppTemplate = createFolderTemplate((context) => {
  return {
    'src': SrcTemplate,
    'Dockerfile': DockerfileTemplate,
    'docker-compose.base.yml': BaseYmlTemplate,
    'docker-compose.app.yml': AppYmlTemplate,
    'docker-compose.test.yml': TestYmlTemplate,
    '.dockerignore': DockerIgnoreTemplate,
    'build.gradle': BuildGradleTemplate,
    'gradle': GradleTemplate,
    'gradlew': GradlewTemplate,
    'gradlew.bat': GradlewBatTemplate,
    'README.md': ReadmeTemplate,
    'nginx.conf': NginxConfTemplate,
    '.casestudy': DotCaseStudyTemplate,
  }
})

module.exports = AppTemplate
