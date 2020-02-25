const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
const {JSDOM} = require('jsdom');
const $ = require('jquery');
const {zillowKey} = require('../map.js')

app.use(cors());
app.use(express.static('./client/dist'));

app.get('/:state/:childtype', (req, res) => {
  console.log(`params -> ${req.params.state}, ${req.params.childtype}`)
  axios
    .get('http://www.zillow.com/webservice/GetRegionChildren.htm', {
      params: {
        'zws-id': zillowKey,
        state: req.params.state,
        childtype: req.params.childtype
      }
    })
    .then((response) => {
      const stateData = [['latitude', 'longitude', 'name', 'zindex']]
      parseData(response.data);

      function parseData(html) {
        const dom = new JSDOM(html);
        const $ = (require('jquery'))(dom.window);
        let responseRecords = $("region");
        for (let i = 0; i < responseRecords.length; i++) {
          let newRecord = [];
          let latitude = $($(responseRecords[i]).find('latitude')).html()
          let longitude = $($(responseRecords[i]).find('longitude')).html()
          let name = $($(responseRecords[i]).find('name')).html()
          let zindex = $($(responseRecords[i]).find('zindex')).html()
          newRecord.push(Number(latitude));
          newRecord.push(Number(longitude));
          newRecord.push(name)
          newRecord.push(Number(zindex));
          zindex === undefined ? null : stateData.push(newRecord); // this method excludes cities with no zindex
        }
      }
      res.send(JSON.stringify(stateData))
    })
    .catch((error) => {
      console.log(`Error in Zillow get request --> `, error);
      res.send(`Zillow request encountered error.`);
    })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});