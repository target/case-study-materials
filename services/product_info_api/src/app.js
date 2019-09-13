const express = require('express');
const app = express();

var data = require('./products.json');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/product/:key', async (req, res) => {
  const { key } = req.params;
  for(var i in data) {
    var product = data[i];
    if(product.product_id === parseInt(key)) {
      return res.json(product);
    }
  }
  return res.json({});
});

app.get('/products', async (req, res) => {
  return res.send(data);
});

app.get('/', (req, res) => {
  return res.send('OK');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
