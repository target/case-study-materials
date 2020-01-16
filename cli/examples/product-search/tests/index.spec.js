const expect = require('chai').expect;
const CaseStudy = require('target-case-study')
const path = require('path')
const waitOn = require('wait-on')
const axios = require('axios')
const rimraf = require('rimraf')

const OUT_DIR = path.join(__dirname, 'out')
const PACKED_APP_PATH = path.join(__dirname, 'my-app.zip')
const UNPACKED_APP_PATH = path.join(OUT_DIR, 'unpacked-app')

describe('product-search-api-tests', function() {

    let allProducts

    before(async function() {
        await removeAsync(OUT_DIR)
        await CaseStudy.unpack(PACKED_APP_PATH, UNPACKED_APP_PATH)
        CaseStudy.run(UNPACKED_APP_PATH)

        await waitOn({
            resources: [
                'http://localhost:8000/products/',
            ],
            interval: 2000, // poll interval in ms
            timeout: 180000,
        })

        allProducts = await fetchAllProducts()
    });

    it('product search should filter results', async function() {
       const receivedProducts = await searchProducts('MALESUADA')
       const expectedProducts = allProducts.filter((p) => p.product_title.includes('MALESUADA'))

       expect(receivedProducts.length).to.equal(expectedProducts.length)
       expect(
           receivedProducts.map(p => p.product_id)
       ).to.deep.equal(
           expectedProducts.map(p => p.product_id)
       )
    });

    after(async function() {
        await CaseStudy.stop(UNPACKED_APP_PATH)
    });
  
});


const fetchAllProducts = async () => {
    const res = await axios.get('http://localhost:8001/product_info_api/products/')
    return res.data
}

const searchProducts = async (search) => {
    const res = await axios.get(
        'http://localhost:8000/products',
        {
            params: {
                search
            }
        }
    )
    return res.data
}

const removeAsync = async (path) => {
    return new Promise((resolve, reject) => {
        rimraf(path, {}, (err) => {
        if (err) {
            reject(err)
        }
        else {
            resolve()
        }
        })
    })
}