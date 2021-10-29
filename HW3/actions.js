
let map;
let marker;
let markers = [];
$(document).ready(function() {
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAM6Ei9v9epKvuhIvkz8jDu_skVfBVQeN4&libraries=places', () => {

        var myLatLng = {
          lat: 40.4637,
          lng: -3.7492
        }
    
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: myLatLng
        })
        const inputText = document.createElement("input");

        inputText.type = "text";
        inputText.placeholder = "Enter a location";

        const submitButton = document.createElement("input");

        submitButton.type = "button";
        submitButton.value = "Search";
        submitButton.classList.add("button", "button-primary");

        
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
        
        
        submitButton.addEventListener("click", () =>{
            clear();
            $.ajax({
                url: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-10-01&endtime=2021-10-15&minmagnitude=5',
                dataType: 'json',
                success: function(data) {
                    $.each(data.features, function(index, data1) {
                        let place = data1.properties.place;
                        if(place && place.toLowerCase().indexOf(inputText.value.toLowerCase()) >= 0) {
                            var longitude = data1.geometry.coordinates[0]
                        var latitude = data1.geometry.coordinates[1]
                       
                        marker = new google.maps.Marker({
                            position: {lat:latitude, lng: longitude},
                            sName: "Marker Name",
                            map: map,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 8.5,
                                fillColor: "#F00",
                                fillOpacity: 0.4,
                                strokeWeight: 0.4,
                                scale: data1.properties.mag *2
                            },
                        });
                        markers.push(marker);
                        }
                        
                    })
                },
                error: function() {alert("error loading file"); }
            })    
                
            });

        $.ajax({
            url: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-10-01&endtime=2021-10-15&minmagnitude=5',
            dataType: 'json',
            success: function(data) {
                
                $.each(data.features, function(index, data1) {
                    var longitude = data1.geometry.coordinates[0]
                    var latitude = data1.geometry.coordinates[1]
                   
                    marker = new google.maps.Marker({
                        position: {lat:latitude, lng: longitude},
                        sName: "Marker Name",
                        map: map,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8.5,
                            fillColor: "#F00",
                            fillOpacity: 0.4,
                            strokeWeight: 0.4,
                            scale: data1.properties.mag *2
                        },
                    });
                    markers.push(marker);
                })
                
            },
            error: function() {alert("error loading file"); }
    
        });
    
    })
})
function clear() {
	for(let i=0; i< markers.length; i++) {
        markers[i].setMap(null);
    }
	
	}



