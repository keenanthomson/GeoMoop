import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Chart} from 'react-google-charts';
import axios from 'axios';

export const App = () => {
  const [region, setRegion] = useState('US-MA'); // change this using a selector dropdown
  const [priceData, setPriceData] = useState(undefined)
  
  useEffect(() => {
    axios
    .get(`http://localhost:3001/${region}/city`)
    .then(response => setPriceData(response.data))
    .catch(error => console.log(`Error --> `, error))
  }, []);

  if (priceData) {
    console.log(priceData)
    return(
        <Chart
          width={'1000px'}
          height={'600px'}
          chartType="GeoChart"
          data={
          // [["latitude", "longitude","zindex"],["42.313374","-71.047625","439100"]]
          priceData
          }
          options={{
            region: 'US-MA',
            displayMode: 'markers',
            resolution: 'provinces',
            // colorAxis: {colors: ['blue', 'green']}
          }}
          mapsApiKey="AIzaSyB0CkhQh8kVsw3goTeNsbDNlCrNOuo90Wg"
          rootProps={{ 'data-testid': '1' }}
        />
    )
  } else {
    return (<div margin={'20px'}>LOADING...</div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('regions_div'));