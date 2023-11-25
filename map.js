let suggestionsView = document.querySelector(".suggestions");
let startLocationName = ""
let endLocationName = ""

let newID = crypto.randomUUID();
mapboxgl.accessToken = 'pk.eyJ1IjoiaWJyYWhpbWFtZTEzIiwiYSI6ImNsb2xlaDUxbDJlcXYya3A5bzZoZWc5MzkifQ.YyKfquv1mvX7xrUj5oG1Ow';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [33.321258,35.212448], // starting position [lng, lat]
    zoom: 9, // starting zoom
});

let source = [33.321258, 35.212448];
let destination;

async function getRoute(start, end) {


const query = await fetch(
`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
{ method: 'GET' }
);

const json = await query.json();
const data = json.routes[0];
console.log("distance: ", data.distance);
const route = data.geometry.coordinates;

const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
    type: 'LineString',
    coordinates: route
    }
};

console.log(geojson);

// if the route already exists on the map, we'll reset it using setData
if (map.getSource('route')) {
map.getSource('route').setData(geojson);
}
// otherwise, we'll make a new request
else {
map.addLayer({
id: 'route',
type: 'line',
source: {
    type: 'geojson',
    data: geojson
},
layout: {
    'line-join': 'round',
    'line-cap': 'round'
},
paint: {
    'line-color': '#ff0000',
    'line-width': 5,
    'line-opacity': 0.75
}
});
}
// add turn instructions here at the end
}


async function giveSuggestions(value) {

console.log(value);

showSuggestionsView();

const query = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${value}&limit=3&session_token=${newID}&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
);

const json = await query.json();

suggestionsView.innerHTML = "";

if(json.suggestions){
    json.suggestions.forEach( result => {
        populateList(result.name);
    });
}

function populateList(value) {
    
    let element = document.createElement('div');
    console.log("value: ",value);
    element.textContent = value;
    element.className = "suggestion-row";

    element.addEventListener('click', () => setSourceTo(value));

    suggestionsView.appendChild(element);

}

async function setSourceTo(value){
    startLocationName = value;
    
    let searchArea = document.querySelector(".search-area");
    let inputBox = searchArea.querySelector("input");

    inputBox.value = value;

    const query = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );

    const json = await query.json();

    if(json){
        console.log(json)
        console.log("[lat, long]: ", json.features[0].center);

        let result = json.features[0].center;

        getRoute(source, result);
    }

    hideSuggestionsView();
}

function setDestinationTo(value){
    endLocationName = value;
}


function showSuggestionsView(){
    suggestionsView.style.display = "grid"
}

function hideSuggestionsView(){
    suggestionsView.style.display = "none"
}

}
