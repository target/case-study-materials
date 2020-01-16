module.exports = {
  services: [{
    name: 'version_api',
    image: 'target/casestudy:version_api',
    type: 'http',
  },{
    name: 'fake_api',
    image: 'target/casestudy:fake_api',
    type: 'http',
  },{
    name: 'product_info_api',
    image: 'target/casestudy:product_info_api',
    type: 'http',
  }],
  databases: []
}
