import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Chart} from 'react-google-charts';
import axios from 'axios';

export const App = () => {
  const [region, setRegion] = useState('US-MA'); // change this using a selector dropdown
  const [priceData, setPriceData] = useState(['City', 'zindex'])
  useEffect(() => {
    axios
    .get(`http://localhost:3001/${region}/city`)
    .then(response => setPriceData(response))
    .catch(error => console.log(`Error --> `, error))
  }, []);

  return(
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="GeoChart"
        data={[
          ['City', 'zindex']

        ]}
        options={{
          region: 'US-MA',
          displayMode: 'markers',
          resolution: 'provinces',
        }}
        mapsApiKey="AIzaSyB0CkhQh8kVsw3goTeNsbDNlCrNOuo90Wg"
        rootProps={{ 'data-testid': '1' }}
      />
  )
}

ReactDOM.render(<App/>, document.getElementById('regions_div'));