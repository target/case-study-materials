const fs = require('fs')
const path = require('path')
const api = require('../lib/api')
const utils = require('../lib/utils')
const expect = require('chai').expect;
const axios = require('axios')

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
      info.children = fs.readdirSync(filename).map(function(child) {
          return dirTree(filename + '/' + child);
      });
    }

    return info;
}

const OUT_DIR = path.join(__dirname, 'out')

const testUtils = {
  getDirectoryStructureAsync: async (path) => {
    return await dirTree(path)
  },
  initApp: async (base) => {
    const appPath = path.join(OUT_DIR, 'test-app')
    await api.init(
      base,
      appPath,
    )
    return appPath
  },
  initAppWithMissingCaseStudyFile: async (base) => {
    const appPath = path.join(OUT_DIR, 'test-app-missing-casestudy-file')
    await api.init(
      base,
      appPath,
    )
    await utils.removeAsync(path.join(appPath, '.casestudy'))
    return appPath
  },
  initAppWithMissingCaseStudyId: async (base) => {
    const appPath = path.join(OUT_DIR, 'test-app-missing-casestudy-id')
    await api.init(
      base,
      appPath,
    )
    await utils.writeFileAsync(path.join(appPath, '.casestudy'), '')
    return appPath
  },
  canConnect: async (url) => {
    try {
      await axios.get(url)
      return true
    }
    catch(e) {
      return false
    }
  }
}

module.exports = testUtils
