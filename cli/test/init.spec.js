const expect = require('chai').expect;
const utils = require('../lib/utils')
const testUtils = require('./utils')
const api = require('../lib/api')
const path = require('path')
const reactAppStructure = require('./structures/react')
const springBootAppStructure = require('./structures/java-spring-boot')

const OUT_DIR = path.join(__dirname, 'out')
const TEST_APP_NAME = 'test-app'
const TEST_APP_PATH = path.join(OUT_DIR, TEST_APP_NAME)

describe('init', function() {

  describe('invalid', function() {
    it('should fail to generate app if no base given', async function() {
      let result = await api.init(
        undefined,
        TEST_APP_PATH,
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.BadArgumentError);
    });

    it('should fail to generate app if invalid base given', async function() {
      let result = await api.init(
        'invalid-stack',
        TEST_APP_PATH,
      )
        .then(() => null)
        .catch((e) => e)

        expect(result).to.be.instanceOf(api.errors.BadArgumentError);
      });

    it('should fail to generate app if no app name given', async function() {
      let result = await api.init(
        'react',
        undefined,
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.BadArgumentError);
    });

    it('should fail to generate app if destination already exists', async function() {
      let result = await api.init(
        'react',
        __filename,
      )
        .then(() => null)
        .catch((e) => e)

      expect(result).to.be.instanceOf(api.errors.OverwriteError);
    });
  });


  describe('react', function() {
    describe('no services', function() {
      before(async function() {
        await utils.removeAsync(OUT_DIR)
        await api.init(
          'react',
          TEST_APP_PATH,
        )
      });

      it('should generate app with correct directory structure', async function() {
        const tree = await testUtils.getDirectoryStructureAsync(TEST_APP_PATH)
        expect(tree).to.deep.equal(reactAppStructure)
      });

      after(async function() {
        await api.stop(TEST_APP_PATH)
        await utils.removeAsync(OUT_DIR)
      });
    });
  });


  describe('java-spring-boot', function() {
    describe('no services', function() {
      before(async function() {
        await utils.removeAsync(OUT_DIR)
        await api.init(
          'java-spring-boot',
          TEST_APP_PATH,
        )
      });

      it('should generate app with correct directory structure', async function() {
        const tree = await testUtils.getDirectoryStructureAsync(TEST_APP_PATH)
        expect(tree).to.deep.equal(springBootAppStructure)
      });

      after(async function() {
        await utils.removeAsync(OUT_DIR)
      });
    });
  });

  describe('regardless of base', function() {
      beforeEach(async function() {
        await utils.removeAsync(OUT_DIR)
      });

      it('should return path of app', async function() {
        const appPath = await api.init(
          'java-spring-boot',
          TEST_APP_PATH,
        )
        expect(appPath).to.equal(TEST_APP_PATH)
      });

      after(async function() {
        await api.stop(TEST_APP_PATH)
        await utils.removeAsync(OUT_DIR)
      });
  });
  
});
