import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Chart} from 'react-google-charts';
import axios from 'axios';

export const App = () => {
  const [region, setRegion] = useState('US-MA');

  useEffect(() => {
    axios
    .get('http://www.zillow.com/webservice/GetRegionChildren.htm', {
      params: {
        ZWSID: key,
        state: 'MA',
        childtype: 'city'
      }
    })
    .then((response) => console.log(`RESPONSE --> `, response))
    .catch((error) => console.log(`Error in Zillow get request --> `, error))
    }, []);

  return(
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="GeoChart"
        data={[
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700],
        ]}
        mapsApiKey="AIzaSyAwyqQ9-uNiw6fIYQGFqeATlVZxmSwtOok"
        rootProps={{ 'data-testid': '1' }}
      />
  )
}

ReactDOM.render(<App/>, document.getElementById('regions_div'));