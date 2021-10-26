let map;
let marker;
let geocoder;

let temp;
let infoWindow;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 32.9857619, lng: -96.7500993 },
    mapTypeControl: false,
  	});
	geocoder = new google.maps.Geocoder();
	infoWindow = new google.maps.InfoWindow()
	const inputText = document.createElement("input");

	inputText.type = "text";
	inputText.placeholder = "Enter a location";

	const submitButton = document.createElement("input");

	submitButton.type = "button";
	submitButton.value = "Geocode";
	submitButton.classList.add("button", "button-primary");

	const clearButton = document.createElement("input");

	clearButton.type = "button";
	clearButton.value = "Clear";
	clearButton.classList.add("button", "button-secondary");
	response = document.createElement("pre");
	response.id = "response";
	response.innerText = "";
	responseDiv = document.createElement("div");
	responseDiv.id = "response-container";
	responseDiv.appendChild(response);

	const instructionsElement = document.createElement("p");

	instructionsElement.id = "instructions";
	instructionsElement.innerHTML =
		"<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
	marker = new google.maps.Marker({
		map,
	});
	map.addListener("click", (e) => {
		temp = geocode({ location: e.latLng });
	});
	submitButton.addEventListener("click", () =>{
	clear();
		geocode({ address: inputText.value })
		
	});
	clearButton.addEventListener("click", () => {
		clear();
	});
	clear();
	
	}

	function clear() {
	marker.setMap(null);
	
	}

	function geocode(request) {
	clear();
	geocoder
		.geocode(request)
		.then((result) => {
		const { results } = result;

		map.setCenter(results[0].geometry.location);
		var request = {
			location: results[0].geometry.location,
			radius: '1500',
			type: ['hospital']
		};
			service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, callback);
			
			return results;
		})
		.catch((e) => {
		alert("Geocode was not successful for the following reason: " + e);
		});
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i],i);
            
        }
        
      }
}
function createMarker(place, i) {
	if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
      	map,
      	position: place.geometry.location,
		title: `${i+1}. ${place.name}`,
		label: `${i + 1}`,
    });
	marker.addListener("click", () => {
		infoWindow.close();
		infoWindow.setContent(marker.getTitle());
		infoWindow.open(marker.getMap(), marker);
	  });
  
  }