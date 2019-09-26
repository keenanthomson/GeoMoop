import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Chart} from 'react-google-charts';
import axios from 'axios';

export const App = () => {
  const [region, setRegion] = useState('US-MA'); // change this using a selector dropdown

  useEffect(() => {
    axios
    .get('http://localhost:3001/US-MA/city')
    .then((response) => console.log(JSON.parse(response)))
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
          ['Russia', 700],
        ]}
        options={{
          displayMode: 'markers',

        }}
        mapsApiKey="AIzaSyB0CkhQh8kVsw3goTeNsbDNlCrNOuo90Wg"
        rootProps={{ 'data-testid': '1' }}
      />
  )
}

ReactDOM.render(<App/>, document.getElementById('regions_div'));