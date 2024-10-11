# leaflet-challenge
Module 15 Challenge - United States Geological Survey

# Earthquake and Tectonic Plate Visualization

## Overview

This project visualizes earthquake data and tectonic plate boundaries on an interactive map using **Leaflet.js**. The map allows users to view earthquakes based on their magnitude and depth, and it also overlays tectonic plate boundaries to explore the relationship between seismic activity and tectonic movements.

## Features

- **Earthquake Visualization**: Earthquakes from the past week are plotted using data from the [USGS GeoJSON feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
  - The size of the markers represents earthquake magnitude.
  - The color of the markers indicates the depth of the earthquake.
- **Tectonic Plate Boundaries**: The tectonic plate boundaries are plotted using data from the [Tectonic Plates GitHub repository](https://github.com/fraxen/tectonicplates).
  - The tectonic boundaries are displayed as orange lines.
- **Multiple Base Maps**: Users can toggle between a **Street Map** and a **Satellite Map** view.
- **Layer Control**: Users can toggle the display of earthquakes and tectonic plate boundaries independently.
- **Interactive Map**: Clicking on an earthquake marker shows additional information about the earthquake, such as location, magnitude, and depth.
- **Legend**: A color-coded legend shows the depth range corresponding to each marker color.

## Technologies Used

- **Leaflet.js**: A JavaScript library for interactive maps.
- **D3.js**: Used to fetch and process GeoJSON data.
- **HTML/CSS/JavaScript**: Standard web technologies for building the map interface.

## Data Sources

- **Earthquake Data**: Provided by the US Geological Survey (USGS) and updated every 5 minutes. The specific dataset used is the [All Earthquakes from the Past Week GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
- **Tectonic Plate Boundaries**: Provided by the [Tectonic Plates GitHub repository](https://github.com/fraxen/tectonicplates).

## How It Works

1. **Fetch Earthquake Data**: Earthquake data is fetched from the USGS GeoJSON feed, and each earthquake is plotted on the map based on its latitude and longitude.
2. **Marker Styling**:
   - The **size** of the earthquake marker is based on the earthquake's magnitude.
   - The **color** of the marker represents the depth of the earthquake:
     - Depth < 10 km: Light Green
     - Depth 10–30 km: Green
     - Depth 30–50 km: Yellow
     - Depth 50–70 km: Orange
     - Depth 70–90 km: Red
     - Depth > 90 km: Dark Red
3. **Tectonic Plate Boundaries**: Tectonic plate boundaries are fetched from the GitHub dataset and displayed as orange lines on the map.
4. **Layer Control**: The map includes layer controls allowing users to toggle between Street and Satellite maps, and toggle earthquake and tectonic plate layers on and off.
5. **Legend**: A color-coded legend is added to indicate the depth corresponding to marker colors.

## How to Run the Project

1. Clone this repository.
2. Open the `index.html` file in your browser.
3. The map will load with earthquake data from the past week and tectonic plate boundaries.
4. Use the layer control in the top-right corner to toggle between base maps (Street or Satellite) and overlays (Earthquakes or Tectonic Plates).

## Screenshot

![Earthquake Visualization](https://github.com/hamiltonbrba/leaflet-challenge/blob/main/Leaflet-Part-2/Images/5-Advanced_mine.png)

## Future Enhancements

- Add more datasets for analysis (e.g., fault lines, volcanoes).
- Add earthquake search or filtering options (by magnitude or region).
- Implement time-based animations to show earthquake activity over time.

