const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
const {JSDOM} = require('jsdom');

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
      // console.log(response.data)
      const responseString = JSON.stringify(response.data)
      const dom = (new JSDOM(responseString))
      const data = {
        prices: [],
        cities: []
      }

      /*
      to improve, querySelectorAll("region") to get each record, then loop and pull
      'name','zindex','latitude','longitude','url' for each region parent element
      */ 

      dom.window.document.querySelectorAll("zindex").forEach(elem => {
        data.prices.push(elem.textContent);
      });
      dom.window.document.querySelectorAll("name").forEach(elem => {
        data.cities.push(elem.textContent);
      });
      console.log(data)
      res.send(`Zillow request completed.`);
    })
    .catch((error) => {
      console.log(`Error in Zillow get request --> `, error);
      res.send(`Zillow request encountered error.`);
    })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});