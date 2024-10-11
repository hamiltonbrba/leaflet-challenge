// Define your earthquake data URL
let earthquakeDataUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Fetch the earthquake data using D3
d3.json(earthquakeDataUrl).then(function(data) {
    console.log(data); // Check if the data is loaded correctly
    createFeatures(data.features);
});

// Initialize the map
let map = L.map('map').setView([37.0902, -95.7129], 5);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

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
        .addTo(map);

    });
}
// Create the legend control
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');
    const depths = [-10, 10, 30, 50, 70, 90];
    const colors = ['lightblue', 'green', 'yellow', 'orange', 'red', 'darkred'];

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
