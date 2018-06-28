// API query URL
var url = "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json";

// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 4
});

// Adding tile layer to the map
var lightmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  	accessToken: 'pk.eyJ1IjoibmFrcmFtMTE1IiwiYSI6ImNqaWR2Ym5peDAyNmgzcG1xeDVwcnIxYXcifQ.FaKZzXQlmEbjQs7q_Md-vA',
    id: 'mapbox.outdoors',
    //minZoom: 2,
    maxZoom: 18,
    // this map option disables world wrapping. by default, it is false.
    continuousWorld: false,
    // this option disables loading tiles outside of the world bounds.
    noWrap: true,
  	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  })
  .addTo(myMap);

// Grabbing the data with d3..
d3.json(url, function(response) {

  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();

  // loop through the airport array
  for (var index = 0; index < response.length; index++) {
    var airport = response[index];

     // If the data has a location property...
     if (airport) {

    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([airport.lat, airport.lon])
    .bindPopup("<h3>" + airport.name + "</h3>", 
              {
              preferCanvas: false
              }));
            };
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
    };
  });

/*   // create a baseMaps object to hold the lightmap layer
var baseMaps = {
  "Light Map": lightmap
};

// create an overlayMaps object to hold the airports layer
var overlayMaps = {
  "Airports": worldAirports
};

// create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, {
  collapsed: false
}).addTo(myMap); */