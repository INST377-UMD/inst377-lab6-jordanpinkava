// from leaflet js webpage
//initialize the map
var map = L.map('map').setView([37.1, -95.7], 4);

//tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//marker code
var marker = L.marker([51.5, -0.09]).addTo(map);

//provided through the instruction page
function getRandomInRange(from, to, fixed) {
   return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
   // .toFixed() returns string, so ' * 1' is a trick to convert to number
   }

//for getting coordinates
var coordinates = [];
for (let i = 0; i < 3; i++) {
   var lat = getRandomInRange(30, 35, 3);
   var lng = getRandomInRange(-100, -90, 3); 
   coordinates.push({ lat: lat, lng: lng });
}
console.log(coordinates);

//to put the markers and display the text on the html page of the random coords
function addMarkers() {
   coordinates.forEach((coord, index) => {

       var marker = L.marker([coord.lat, coord.lng]).addTo(map);

       fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const locality = data.locality;

               
                document.getElementById(`marker${index + 1}`).innerText = `Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng}`;
                document.getElementById(`locality${index + 1}`).innerText = `Locality: ${locality}`;

                
                marker.bindPopup(`Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng} Locality: ${locality}`).openPopup();
            });
   });
}

addMarkers();
