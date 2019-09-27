const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
const {JSDOM} = require('jsdom');
const $ = require('jquery');

app.use(cors());
app.use(express.static('./client/dist'));

app.get('/:state/:childtype', (req, res) => {
  console.log(`Request received ->`, req.params.state, req.params.childtype)
  axios
    .get('http://www.zillow.com/webservice/GetRegionChildren.htm', {
      params: {
        'zws-id': 'X1-ZWz17nhlnteq6j_56tmg',
        state: req.params.state,
        childtype: req.params.childtype
      }
    })
    .then((response) => {
      const stateData = [['City', 'zindex']]
      parseData(response.data);

      function parseData(html) {
        const dom = new JSDOM(html);
        const $ = (require('jquery'))(dom.window);
        let responseRecords = $("region");
        for (let i = 0; i < responseRecords.length; i++) {
          let newRecord = [];
          let name = $($(responseRecords[i]).find('name')).html()
          let zindex = $($(responseRecords[i]).find('zindex')).html()
          newRecord.push(name)
          newRecord.push(zindex);
          zindex === undefined ? null : name === undefined ? null : stateData.push(newRecord);
        }
      }
      res.send(stateData);
    })
    .catch((error) => {
      console.log(`Error in Zillow get request --> `, error);
      res.send(`Zillow request encountered error.`);
    })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});