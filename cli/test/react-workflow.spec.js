const expect = require('chai').expect;
const utils = require('../lib/utils')
const testUtils = require('./utils')
const api = require('../lib/api')
const path = require('path')
const waitOn = require('wait-on')

const OUT_DIR = path.join(__dirname, 'out')
const TEST_APP_PATH = path.join(OUT_DIR, 'test-app')
const PACKED_APP_PATH = path.join(OUT_DIR, 'packed-test-app.zip')
const UNPACKED_APP_PATH = path.join(OUT_DIR, 'unpacked-test-app')

describe('react-workflow', function() {

    before(async function() {
      await utils.removeAsync(OUT_DIR)
    });

    it('should complete', async function() {
      const appPath = await api.init(
        'react',
        TEST_APP_PATH,
        {
          services: ['product_info_api']
        }
      )
      
      const packedAppPath = await api.pack(
        appPath,
        PACKED_APP_PATH
      )

      const unpackedAppPath = await api.unpack(
        packedAppPath,
        UNPACKED_APP_PATH
      )

      const testExitCode = await api.test(unpackedAppPath)

      expect(testExitCode).to.equal(0)

      api.run(unpackedAppPath)

      try {
        await waitOn({
          resources: [
            'http://localhost:8000/',
          ],
          interval: 2000, // poll interval in ms, default 250ms
          timeout: 180000,
        })

        expect(await testUtils.canConnect('http://localhost:8000/')).to.equal(true)
        expect(await testUtils.canConnect('http://localhost:8001/version_api/')).to.equal(true)
        expect(await testUtils.canConnect('http://localhost:8001/product_info_api/')).to.equal(true)
      }
      finally {
        await api.stop(unpackedAppPath)
      }
    });

    after(async function() {
      await utils.removeAsync(OUT_DIR)
    });
  
});
