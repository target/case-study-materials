const expect = require('chai').expect;
const utils = require('../lib/utils')
const testUtils = require('./utils')
const api = require('../lib/api')
const path = require('path')

const OUT_DIR = path.join(__dirname, 'out')
const NON_EXISTENT_PATH = path.join(OUT_DIR, 'non-existent-directory')
const DESTINATION_PATH = path.join(OUT_DIR, 'app.zip')
const TET_APP_ID = 'abc123'

describe('pack', function() {

  describe('should succeed', function() {

    beforeEach(async function() {
      await utils.removeAsync(OUT_DIR)
      await utils.ensureDirAsync(OUT_DIR)
    });

    it('if source and destination are valid paths', async function() {
      const appPath = await testUtils.initApp('react')
      let result = await api.pack(
        appPath,
        DESTINATION_PATH
      )
      let fileExists = await utils.existsAsync(DESTINATION_PATH)
      expect(result).to.equal(DESTINATION_PATH);
      expect(fileExists).to.equal(true);
    });

    after(async function() {
      await utils.removeAsync(OUT_DIR)
    });

  });

  describe('should fail', function() {

    beforeEach(async function() {
      await utils.removeAsync(OUT_DIR)
      await utils.ensureDirAsync(OUT_DIR)
    });

    it('if source is null', async function() {
      let result = await api.pack(
        null,
        DESTINATION_PATH
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.BadArgumentError);
    });

    it('if source is file', async function() {
      let result = await api.pack(
        __filename,
        DESTINATION_PATH
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.MissingFileError);
    });

    it('if source does not exist', async function() {
      let result = await api.pack(
        NON_EXISTENT_PATH,
        DESTINATION_PATH
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.MissingFileError);
    });

    it('if source does not contain .casestudy', async function() {
      let appPath = await testUtils.initAppWithMissingCaseStudyFile('react')
      let result = await api.pack(
        appPath,
        DESTINATION_PATH
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.MissingFileError);
    });

    it('if destination is null', async function() {
      const appPath = await testUtils.initApp('react')
      let result = await api.pack(
        appPath,
        null
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.BadArgumentError);
    });

    it('if destination already exists', async function() {
      const appPath = await testUtils.initApp('react')
      await utils.writeFileAsync(DESTINATION_PATH, '')
      let result = await api.pack(
        appPath,
        DESTINATION_PATH
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.OverwriteError);
    });

    after(async function() {
      await utils.removeAsync(OUT_DIR)
    });

  });
});
