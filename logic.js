var queryUrl = "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json";

d3.json(queryUrl, createMarkers);

function createMarkers(response) {

  // initialize an array to hold airport markers
  var airportMarkers = [];

  // loop through the airport array
  for (var index = 0; index < response.length; index++) {
    var airport = response[index];

    // for each airport, create a marker and bind a popup with the airport's name
    var airportMarker = L.marker([airport.lat, airport.lon])
      .bindPopup("<h3>" + airport.name + "</h3>", {
        preferCanvas: true
    })
      ;

    // add the marker to the airportMarkers array
    airportMarkers.push(airportMarker);
  }

  // create a layer group made from the airport markers array, pass it into the createMap function
  createMap(L.layerGroup(airportMarkers));
}

function createMap(worldAirports) {

  // create the tile layer that will be the background of our map
  var lightmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  	accessToken: 'pk.eyJ1IjoibmFrcmFtMTE1IiwiYSI6ImNqaWR2Ym5peDAyNmgzcG1xeDVwcnIxYXcifQ.FaKZzXQlmEbjQs7q_Md-vA',
    id: 'mapbox.streets',
    minZoom: 2,
    maxZoom: 18,
    // this map option disables world wrapping. by default, it is false.
    continuousWorld: false,
    // this option disables loading tiles outside of the world bounds.
    noWrap: true,
  	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  });

  // create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // create an overlayMaps object to hold the airports layer
  var overlayMaps = {
    "Airports": worldAirports
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [lightmap, worldAirports]
  });

  // create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}