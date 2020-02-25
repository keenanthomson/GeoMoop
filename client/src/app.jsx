import React, { useState, useEffect } from 'react';
import {Chart} from 'react-google-charts';
import axios from 'axios';
import {mapKey} from '../../map.js';
import 'react-dropdown/style.css';

export default function App () {
  const [region, setRegion] = useState('US-MA'); // change this using a selector dropdown
  const [priceData, setPriceData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    updateRegionData();
  }, []);

  const updateRegionData = async (newRegion = region) => {
    await setLoading(true);
    axios
    .get(`http://localhost:3001/${newRegion}/city`)
    .then(response => {
      setPriceData(response.data)
      setRegion(newRegion)
    })
    .then(() => {
      console.log(`loading state = ${loading}`);
      setTimeout(() => setLoading(false), 1000);
    })
    .catch(error => console.log(`Error --> `, error))
  }

  // const selectRegion = (e) => {
  //   updateRegionData(e);
  // }

  const loadingDivStyling = {
    margin: '200px 300px'
  }

  const options = ['US-AL','US-AK','US-AZ','US-AR','US-CA','US-CO','US-CT','US-DE','US-DC','US-FL','US-GA','US-HI','US-ID','US-IL','US-IN','US-IA','US-KS','US-KY','US-LA','US-ME','US-MT','US-NE','US-NV','US-NH','US-NJ','US-NM','US-NY','US-NC','US-ND','US-OH','US-OK','US-OR','US-MD','US-MA','US-MI','US-MN','US-MS','US-MO','US-PA','US-RI','US-SC','US-SD','US-TN','US-TX','US-UT','US-VT','US-VA','US-WA','US-WV','US-WI','US-WY'];

  if (loading) {
    return <div style={loadingDivStyling}>LOADING...</div>
  }

  if (!loading) {
    return(
      <div>
        <div> 
          <Chart
            zindex={1}
            height={'400px'}
            width={'800px'}
            chartType="GeoChart"
            data={priceData}
            options={{
              region: region,
              displayMode: 'markers',
              resolution: 'provinces',
              colorAxis: {colors: ['#c8d8b9','#cfa79b','#3e070a']}
            }}
            mapsApiKey={mapKey}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <div>
          <select zindex={2} selected={region} defaultValue={region} onChange={(e) => updateRegionData(e.target.value)}>
            {options.map((elem, index) => {
              if (elem === region) {
                return <option value={elem} key={index} defaultValue={region}>{elem}</option>
              } else {
                return <option value={elem} key={index}>{elem}</option>
              }
            })}
          </select>
        </div>
      </div>
    )
  }
}