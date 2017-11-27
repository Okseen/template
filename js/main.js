var map;
var markers = [];

function initMap() {

	var first = {lat: 39.747290, lng: -104.942244};
	var second = {lat: 39.741953, lng: -104.929737};
	var third = {lat: 39.753051, lng: -104.930318};

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.747455, lng: -104.934844},
		zoom: 14
	});

	var iconBase = 'img/';
    var icons = {
      selected: {
        icon: iconBase + 'pin1.png'
      },
      unselected: {
        icon: iconBase + 'pin2.png'
      }
    };

    var features = [
      {
        position: new google.maps.LatLng(first.lat, first.lng),
        type: 'selected'
      },
      {
        position: new google.maps.LatLng(second.lat, second.lng),
        type: 'unselected'
      },
      {
        position: new google.maps.LatLng(third.lat, third.lng),
        type: 'unselected'
      }
    ];

    var contentString = '<div id="content">'+
	'<div id="bodyContent">'+
	'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
	'sandstone rock formation in the southern part of the '+
	'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
	'south west of the nearest large town.</p>'+
	'</div>'+
	'</div>';

	var infowindow = new google.maps.InfoWindow();


    features.forEach(function(feature) {
	    var marker = new google.maps.Marker({
	        position: feature.position,
	        icon: icons[feature.type].icon,
	        map: map
	    });

	    google.maps.event.addListener(marker, 'click', (function(marker) {
	      return function() {
	        infowindow.setContent(contentString);
	        infowindow.open(map, marker);
	        for (var j = 0; j < markers.length; j++) {
	          markers[j].setIcon(icons['unselected'].icon);
	        }
	        marker.setIcon(icons['selected'].icon);
	      };
	    })(marker));
		markers.push(marker);
    });
};

$(document).ready(function(){
	$('.logo span').click(function(){
		console.log($('.menu').css('display'));
		if($('.menu').css('display') == 'none'){
			$('.menu').css('display', 'block');
		} else {
			$('.menu').css('display', 'none');
		}
	});
});