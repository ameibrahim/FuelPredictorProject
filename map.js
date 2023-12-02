let suggestionsView = document.querySelector(".suggestions");
let startLocationName = ""
let endLocationName = ""

let startInputBox = document.querySelector(".start-input-location")
let endInputBox = document.querySelector(".end-input-location")

let newID = crypto.randomUUID();
mapboxgl.accessToken = 'pk.eyJ1IjoiaWJyYWhpbWFtZTEzIiwiYSI6ImNsb2xlaDUxbDJlcXYya3A5bzZoZWc5MzkifQ.YyKfquv1mvX7xrUj5oG1Ow';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [33.321258,35.212448], // starting position [lng, lat]
    // pitch: 60,
    // bearing: -60,
    zoom: 10
});

let source;
let destination;
let startMarker;
let endMarker;

async function getRoute(start, end) {

    if(startMarker) startMarker.remove()
    if(endMarker) endMarker.remove()
    // Set marker options.
endMarker = new mapboxgl.Marker({
    color: "#FFFFFF",
    draggable: true
    })
    .setLngLat(end)
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Destination</h1>"))
    .addTo(map);

startMarker = new mapboxgl.Marker({
    color: "var(--accent)",
    draggable: true
    })
    .setLngLat(start)
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Destination</h1>"))
    .addTo(map);

    const bbox = [start, end];
    map.fitBounds(bbox, {
    padding: {top: 200, bottom: 300, left: 150, right: 150},
    duration: 2000,
    });

const query = await fetch(
`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
{ method: 'GET' }
);

    const json = await query.json();
    const routes = json.routes;
    console.log("routes: ",routes);
    const data = json.routes[0];
    console.log("data: ", data.duration /* in seconds */);
    console.log("distance: ", data.distance);
    const route = data.geometry.coordinates;

    setDistance(data.distance);

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


async function giveSuggestions(element) {

    let value = element.value

    showSuggestionsView();

    const query = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${value}&limit=3&session_token=${newID}&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );

    const json = await query.json();

    suggestionsView.innerHTML = "";

    if (element.className == "start-input-location"){
        if(json.suggestions){
            json.suggestions.forEach( result => {
                populateList(result.name, setSourceTo);
            });
        }

        // store source lang lat

    }
    else if(element.className == "end-input-location"){
        if(json.suggestions){
            json.suggestions.forEach( result => {
                populateList(result.name, setEndTo);
            });
        }
    }

    function populateList(value, evenListenerCallback) {
        
        let element = document.createElement('div');
        console.log("value: ",value);
        element.textContent = value;
        element.className = "suggestion-row";

        element.addEventListener('click', () => { evenListenerCallback(value); hideSuggestionsView() });

        suggestionsView.appendChild(element);

    }

    async function setSourceTo(value){

        startLocationName = value;
        console.log("babe: ", value);
        startInputBox.value = value;

        document.querySelector(".start-route-box").textContent = value;

        const query = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );

        const json = await query.json();

        if(json){
            console.log(json)
            console.log("[lat, long]: ", json.features[0].center);
            let result = json.features[0].center;
            source = result;

            // getRoute(source, result);
        }

        // hideSuggestionsView();
    }

    async function setEndTo(value){

        endLocationName = value;
        endInputBox.value = value;
        document.querySelector(".end-route-box").textContent = value;

        const query = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );

        const json = await query.json();

        if(json){
            console.log(json)
            console.log("[lat, long]: ", json.features[0].center);
            let result = json.features[0].center;
            destination = result;
            // getRoute(source, result);
        }

        // hideSuggestionsView();
    }


    function showSuggestionsView(){
        suggestionsView.style.display = "grid"
    }

    function hideSuggestionsView(){
        suggestionsView.style.display = "none"
    }

}


function setDistance(distance){
    let distanceBox = document.querySelector(".distance-box");
    let roundedDistance = Math.round(distance / 1000 * 100) / 100 ;

    distanceBox.querySelector("b").textContent = roundedDistance;

    let {
        fuel,
        co2
    } = APIResults;

    let fuelResult = (fuel * roundedDistance) / 100;
    fuelResult = Math.round(fuelResult * 100) / 100;

    let co2Result = co2 * roundedDistance;
    co2Result = Math.round(roundedDistance * 100);

    let litresBox = document.querySelector(".litres-box");
    let gramsBox = document.querySelector(".grams-box");
    litresBox.querySelector("b").textContent = fuelResult;
    gramsBox.querySelector("b").textContent = co2Result;

}