// Define your earthquake data URL
let earthquakeDataUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Fetch the earthquake data using D3
d3.json(earthquakeDataUrl).then(function(data) {
    console.log(data); // Check if the data is loaded correctly
    createFeatures(data.features);
});


// Fetch the tectonic plate boundaries data from GitHub
let tectonicPlatesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';

d3.json(tectonicPlatesUrl).then(function(data) {
    // Add tectonic plate boundaries to the map
    L.geoJSON(data, {
        color: 'orange',
        weight: 2
    }).addTo(tectonicPlates);  // Adding to tectonicPlates overlay
});

// Initialize the map
let map = L.map('map').setView([37.0902, -95.7129], 5);

// Add the OpenStreetMap tile layer
let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create layer groups for the earthquake data and tectonic plates
let earthquakes = L.layerGroup();
let tectonicPlates = L.layerGroup();

// Function to process earthquake features
function createFeatures(earthquakeData) {
    earthquakeData.forEach(feature => {
        let coords = feature.geometry.coordinates;
        let magnitude = feature.properties.mag;
        let depth = coords[2];

        // Define circle color based on depth
        let color;
        if (depth > 90) color = 'darkred';
        else if (depth > 70) color = 'red';
        else if (depth > 50) color = 'orange';
        else if (depth > 30) color = 'yellow';
        else if (depth > 10) color = 'green';
        else color = '#ccffcc';  // For depths less than 10

        // Define circle size based on magnitude
        let radius = magnitude * 20000; // Adjust the scaling as needed

        // Create a circle marker with a thinner border
        L.circle([coords[1], coords[0]], {
            color: 'black',       // Border color
            weight: 1,            // Thickness of the border (adjust this to make it thinner or thicker)
            fillColor: color,     // Fill color based on depth
            fillOpacity: 0.50,    // Opacity of the fill
            radius: radius        // Radius based on earthquake magnitude
        }).bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Magnitude: ${magnitude}</p><p>Depth: ${depth} km</p>`)
        .addTo(earthquakes);  // Adding to earthquakes overlay

    });
    earthquakes.addTo(map);  // Add the earthquake layer to the map by default
}

// Create the legend control
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');
    const depths = [-10, 10, 30, 50, 70, 90];
    const colors = ['#ccffcc', 'green', 'yellow', 'orange', 'red', 'darkred'];

    div.innerHTML = '<strong>Depth (km)</strong><br>';

    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i class="legend-color" style="background-color:' + colors[i] + ';"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

// Add the legend to the map
legend.addTo(map);

// Base maps and overlay maps for layer control
let baseMaps = {
    "Street Map": streetMap
};

let overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
};

// Add layer controls
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false  // Show the layer control by default
}).addTo(map);

// Add tectonic plates layer to map by default
tectonicPlates.addTo(map);
