import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Chart} from 'react-google-charts';

function App () {
  const [region, setRegion] = useState('US-MA');

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

  //   google.charts.load('current', {
  //     'packages':['geochart'],
  //     'mapsApiKey': 'AIzaSyAwyqQ9-uNiw6fIYQGFqeATlVZxmSwtOok'
  //   });

  //   google.charts.setOnLoadCallback(drawRegionsMap);

  // function drawRegionsMap() {
  //   var data = google.visualization.arrayToDataTable([
  //     ['County','Income','Population'],
  //     ['Norfolk', 75000, 2761477],
  //     ['Barnstable', 70000, 2761477],
  //     ['Middlesex', 65000, 2761477]
  //   ]);

  //   var options = {
  //     region: {region},
  //     sizeAxis: 400,
  //     displayMode: 'markers',
  //     resolution: 'provinces',
  //     magnifyingGlass: {enable: true, zoomFactor: 7.5}
  //     // enableRegionInteractivity: true
  //   };

  //   var chart = new google.visualization.GeoChart(document.getElementById(container));

  //   chart.draw(data, options);