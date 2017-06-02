/* eslint-disable no-undef */

import React from 'react'
import {Header} from 'semantic-ui-react'

const loadScript = (url, callback) => {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0]
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback
  script.onload = callback

  // Fire the loading
  head.appendChild(script)
}

const loadLocation = (place, self, places) => {
  console.log('place lat', place.lat)
  console.log('place lng', place.lng)
  const locationMarker = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/apartment-3.png?alt=media&token=f66902a1-7fc5-40a5-b038-b5cd915a5363'

  const MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green'

  let markers = []

  markers.forEach(function (marker) {
    console.log(marker)
    marker.setMap(null)
  })

  const icon = {
    url: locationMarker,
    size: new google.maps.Size(150, 150),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    // scaledSize: new google.maps.Size(100, 100)
  }

  markers.push(new google.maps.Marker({
    map: self.map,
    icon: icon,
    position: place
  }))

  self.map.panTo(place)
  self.map.setZoom(15)

  let search = {
    // bounds: self.map.getBounds(),
    types: ['school', 'doctor', 'grocery_or_supermarket'],
    location: place,
    radius: 2000
  }
  console.log('here1')
  places.nearbySearch(search, (results, status) => {
    console.log('results', results)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearResults()
      clearMarkers(markers)
      for (let i = 1; i < results.length; i++) {
        let markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
        let markerIcon = MARKER_PATH + markerLetter + '.png'
  // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        })
  // If the user clicks a school marker, show the details of that hotel
  // in an info window.
        markers[i].placeResult = results[i]
        console.log('placeResult', markers[i].placeResult.place_id)
        google.maps.event.addListener(markers[i], 'click', () => showInfoWindow(self, places, markers[i]))
        setTimeout(markers[i].setMap(self.map), i * 100)
        addResult(results[i], i, markers)
      }
    }
  })
}

function clearResults () {
  let results = document.getElementById('results')
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0])
  }
}

function clearMarkers (markers) {
  for (var i = 1; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null)
    }
  }
  markers = []
}

const addResult = (result, i, markers) => {
  const MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green'
  let results = document.getElementById('results')
  let markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
  let markerIcon = MARKER_PATH + markerLetter + '.png'

  let tr = document.createElement('tr')
  tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF')
  tr.onclick = function () {
    google.maps.event.trigger(markers[i], 'click')
  }

  let iconTd = document.createElement('td')
  let nameTd = document.createElement('td')
  let icon = document.createElement('img')
  icon.src = markerIcon
  icon.setAttribute('class', 'placeIcon')
  icon.setAttribute('className', 'placeIcon')
  let name = document.createTextNode(result.name)
  iconTd.appendChild(icon)
  nameTd.appendChild(name)
  tr.appendChild(iconTd)
  tr.appendChild(nameTd)
  results.appendChild(tr)
}

const showInfoWindow = (self, places, marker) => {
  places.getDetails({placeId: marker.placeResult.place_id},
  function (place, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return
    }

    new google.maps.InfoWindow({
      content: document.getElementById('info-content')
    }).open(self.map, marker)
    buildIWContent(place)
  })
}

const buildIWContent = (place) => {
  document.getElementById('iw-icon').innerHTML = '<img class="schoolIcon" ' +
'src="' + place.icon + '"/>'
  document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
'">' + place.name + '</a></b>'
  document.getElementById('iw-address').textContent = place.vicinity

  if (place.formatted_phone_number) {
    document.getElementById('iw-phone-row').style.display = ''
    document.getElementById('iw-phone').textContent =
place.formatted_phone_number
  } else {
    document.getElementById('iw-phone-row').style.display = 'none'
  }

  if (place.rating) {
    var ratingHtml = ''
    for (var i = 0; i < 5; i++) {
      if (place.rating < (i + 0.5)) {
        ratingHtml += '&#10025;'
      } else {
        ratingHtml += '&#10029;'
      }
      document.getElementById('iw-rating-row').style.display = ''
      document.getElementById('iw-rating').innerHTML = ratingHtml
    }
  } else {
    document.getElementById('iw-rating-row').style.display = 'none'
  }

  if (place.website) {
    let hostnameRegexp = new RegExp('^https?://.+?/')
    var fullUrl = place.website
    var website = hostnameRegexp.exec(place.website)
    if (website === null) {
      website = 'http://' + place.website + '/'
      fullUrl = website
    }
    document.getElementById('iw-website-row').style.display = ''
    document.getElementById('iw-website').textContent = website
  } else {
    document.getElementById('iw-website-row').style.display = 'none'
  }
}

class Testmap extends React.Component {

  render () {
    return (
      <div>
        <Header icon='map' as='h2' content='Map of Surroundings' />

        <div id='locationField'>
          <input id='autocomplete' placeholder='Name of property' type='text' defaultValue='ion orchard' />
          <button onClick={this.saveLocation}>SAVE</button>
        </div>

        <div style={{display: 'none'}}>
          <div id='info-content'>
            <table>
              <tr id='iw-url-row' class='iw_table_row'>
                <td id='iw-icon' class='iw_table_icon' />
                <td id='iw-url' />
              </tr>
              <tr id='iw-address-row' class='iw_table_row'>
                <td class='iw_attribute_name'>Address:</td>
                <td id='iw-address' />
              </tr>
              <tr id='iw-phone-row' class='iw_table_row'>
                <td class='iw_attribute_name'>Telephone:</td>
                <td id='iw-phone' />
              </tr>
              <tr id='iw-rating-row' class='iw_table_row'>
                <td class='iw_attribute_name'>Rating:</td>
                <td id='iw-rating' />
              </tr>
              <tr id='iw-website-row' class='iw_table_row'>
                <td class='iw_attribute_name'>Website:</td>
                <td id='iw-website' />
              </tr>
            </table>
          </div>
        </div>

        <div id='map-listing'>
          <div id='map-render' ref='map' />
          <div id='places-listing'>
            <Header content='Nearby Amenities' />
            <div id='places-results'>
              <table id='resultsTable'>
                <tbody id='results' />
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const self = this
    const ga = {lat: 1.308084, lng: 103.832036}
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCSbxQeyVLBk8_cUUB52hILQKtP38QuFqg&libraries=places&region=sg', () => {
      self.map = new google.maps.Map(self.refs.map, {
        center: ga,
        zoom: 15,
        mapTypeId: 'roadmap'
      })

      let places = new google.maps.places.PlacesService(self.map)

      loadLocation(ga, self, places)
    })
  }

}

export default Testmap
