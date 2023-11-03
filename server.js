const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/get_prices', async function(req,res) {
  res.set('Access-Control-Allow-Origin', '*');
  const url = "https://api.porssisahko.net/v1/latest-prices.json";
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  fetch(url,options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(error => console.log(error));

  try {
    let response = await fetch(url,options);
    response = await response.json();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: 'Internal Server Error.'});
  }
});