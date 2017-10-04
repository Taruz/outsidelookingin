function isLocationOk(coords1)
{
  console.log(coords1);

  minDistance = 50 // minDistance in m
  coords2 = {"lat" : 59.33204200000000, "lng" : 18.064943900000000}; //coorinates to kulturhuset //18.075835942986373 00000000
  // var R = 6.371; // km
  var R = 6371000;
  var dLat = toRad(coords2.lat-coords1.lat);
  var dLon = toRad(coords2.lng-coords1.lng);
  var lat1 = toRad(coords1.lat);
  var lat2 = toRad(coords2.lat);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  if (d > minDistance) {
    console.log(d);
    return true;
  } else {
    return false;
  }
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}

function checkPosition(position) {
    positionOk = isLocationOk({"lat" : position.coords.latitude, "lng" : position.coords.longitude});
    if (!positionOk) {
      // visa "blockskärm"
      $('.block').show();
      $('.loading').hide();
      $('.slides').hide();
    } else { //if location is OK
        // visa vanliga siten
        $('.block').hide();
        $('.loading').hide();
        $('.slides').show();
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(checkPosition);
    } else {
        document.body.innerHTML = "Geolocation is not supported by this browser.";
    }
}

getLocation();
