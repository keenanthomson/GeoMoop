const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
const jsdom = require("jsdom");

app.use(cors());

app.use(express.static('./client/dist'));

app.get('/:state/:childtype', (req, res) => {
  axios
    .get('http://www.zillow.com/webservice/GetRegionChildren.htm', {
      params: {
        'zws-id': 'X1-ZWz17nhlnteq6j_56tmg',
        state: req.params.state,
        childtype: req.params.childtype
      }
    })
    .then((response) => {

      let parsed = JSON.stringify(response);
      console.log(parsed)
      // need to figure out solution that parses incoming data to region and pricing data only
      // res.send();
    })
    .catch((error) => console.log(`Error in Zillow get request --> `, error))
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});