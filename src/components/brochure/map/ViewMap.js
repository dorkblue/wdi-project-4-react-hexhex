/* eslint-disable no-undef */

import React from 'react'
import {Header} from 'semantic-ui-react'
import axios from 'axios'

class ViewMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tempLat: props.data.lat,
      tempLong: props.data.lng,
      savedLat: props.data.lat,
      savedLong: props.data.lng
    }

    this.saveLocation = this.saveLocation.bind(this)
    this.loadMap = this.loadMap.bind(this)
  }

  saveLocation () {
    console.log('this tempLat', this.state.tempLat)
    console.log('this tempLong', this.state.tempLong)

    const newLat = this.state.tempLat
    const newLng = this.state.tempLong

    axios({
      method: 'PUT',
      url: `${this.props.backendURL + 'location/' + this.props.locationKey}`,
      data: {
        lat: newLat,
        lng: newLng
      }
    })
    .then((response) => {
      console.log('location res', response.data)
      this.setState({
        savedLat: response.data.lat,
        savedLong: response.data.lng,
        tempLat: null,
        tempLong: null
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.lat !== nextProps.data.lat && this.props.data.lng !== nextProps.data.lng) {
      console.log('nextProps', nextProps.data)
      // this.setState({
      //   savedLat: nextProps.data.lat,
      //   savedLong: nextProps.data.lng
      // })

      console.log('after receive props set state')
      this.loadMap(nextProps.data)
    }
  }

  loadMap (data) {
    let self = this
    let generalAssembly = {lat: 1.308084, lng: 103.832036}
    let savedLocation = null
    if (this.state.savedLat !== '' && this.state.savedLong !== '') {
      savedLocation = {lat: data.lat, lng: data.lng}
    }

    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCSbxQeyVLBk8_cUUB52hILQKtP38QuFqg&libraries=places&region=sg', function () {
      let places
      let infoWindow
      let autocomplete
      let MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green'
      let hostnameRegexp = new RegExp('^https?://.+?/')
      let markers = []

      console.log('self.refs.map', self.refs.map)

      self.map = new google.maps.Map(self.refs.map, {
        center: generalAssembly,
        zoom: 12,
        mapTypeId: 'roadmap'
      })

      if (savedLocation) {
        self.map = new google.maps.Map(self.refs.map, {
          center: savedLocation,
          zoom: 12,
          mapTypeId: 'roadmap'
        })
      }

      let input = document.getElementById('pac-input')

      infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
      })

      autocomplete = new google.maps.places
        .Autocomplete(document.getElementById('autocomplete'))
      console.log('old autocomplete', autocomplete)

      places = new google.maps.places.PlacesService(self.map)

      autocomplete.addListener('place_changed', onPlaceChanged)

      if (savedLocation) {
        onLoad(savedLocation)
      }

//  document.getElementById('country').addEventListener(
// 'change', setAutocompleteCountry);

      function onLoad (savedLocation) {
        let markers = []

        if (savedLocation) {
          markers.forEach(function (marker) {
            console.log(marker)
            marker.setMap(null)
          })

          let icon = {
            url: 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/apartment-3.png?alt=media&token=f66902a1-7fc5-40a5-b038-b5cd915a5363',
            size: new google.maps.Size(150, 150),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          }

// Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: self.map,
            icon: icon,
            // title: place.name,
            position: savedLocation
          }))

          console.log('markers', markers)

          self.map.panTo(savedLocation)
          self.map.setZoom(15)
          savedSearch()
        }
      }

      function savedSearch () {
        let search = {
        // bounds: self.map.getBounds(),
          types: ['school', 'doctor', 'grocery_or_supermarket'],
          location: savedLocation,
          radius: 2000
        }

        console.log(places)

        places.nearbySearch(search, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults()
            clearMarkers()
// Create a marker for each school found, and
// assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
              var markerIcon = MARKER_PATH + markerLetter + '.png'
// Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
              })
// If the user clicks a school marker, show the details of that hotel
// in an info window.
              markers[i].placeResult = results[i]
              google.maps.event.addListener(markers[i], 'click', showInfoWindow)
              setTimeout(dropMarker(i), i * 100)
              addResult(results[i], i)
            }
          }
        })
      }

      function onPlaceChanged () {
        let markers = []

        console.log('after onPlaceChanged autocomplete', autocomplete)

        let place = autocomplete.getPlace()
        console.log('place.icon is', place.icon)
        console.log('place.geometry.location is', place.geometry.location)

        self.setState({
          tempLat: place.geometry.location.lat(),
          tempLong: place.geometry.location.lng()
        })

        console.log('self tempLat', self.state.tempLat)

        console.log('set state liao')

        if (place.geometry) {
          markers.forEach(function (marker) {
            console.log(marker)
            marker.setMap(null)
          })

          console.log('markers', markers)

          let icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          }

// Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: self.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }))

          console.log('markers', markers)

          self.map.panTo(place.geometry.location)
          self.map.setZoom(15)
          search()
        } else {
          document.getElementById('autocomplete').placeholder = 'Search'
        }
      }

// Search for schools in singapore, within the viewport of the map.
      function search () {
        let search = {
          bounds: self.map.getBounds(),
          types: ['school', 'doctor', 'grocery_or_supermarket']
        }

        console.log(places)

        places.nearbySearch(search, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults()
            clearMarkers()
// Create a marker for each school found, and
// assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
              var markerIcon = MARKER_PATH + markerLetter + '.png'
// Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
              })
// If the user clicks a school marker, show the details of that hotel
// in an info window.
              markers[i].placeResult = results[i]
              google.maps.event.addListener(markers[i], 'click', showInfoWindow)
              setTimeout(dropMarker(i), i * 100)
              addResult(results[i], i)
            }
          }
        })
      }

      function clearMarkers () {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null)
          }
        }
        markers = []
      }

      function dropMarker (i) {
        return function () {
          markers[i].setMap(self.map)
        }
      }

      function addResult (result, i) {
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

      function clearResults () {
        let results = document.getElementById('results')
        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0])
        }
      }

// Get the place details for a school. Show the information in an info window,
// anchored on the marker for the school that the user selected.
      function showInfoWindow () {
        console.log('infoWindow', infoWindow)
        let marker = this
        places.getDetails({placeId: marker.placeResult.place_id},
        function (place, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return
          }
          infoWindow.open(self.map, marker)
          buildIWContent(place)
        })
      }

// Load the place information into the HTML elements used by the info window.
      function buildIWContent (place) {
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

// Rating for establishment
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

// The regexp isolates the first part of the URL (domain plus subdomain)
// to give a short URL for displaying in the info window.
        if (place.website) {
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
// closing brackets for loadScript
    })
  }

  componentDidMount () {
    // this.loadMap()
  }

//   componentDidMount () {
//     let self = this
//     let generalAssembly = {lat: 1.308084, lng: 103.832036}
//     let savedLocation = null
//     if (this.state.savedLat !== '' && this.state.savedLong !== '') {
//       savedLocation = {lat: this.state.savedLat, lng: this.state.savedLong}
//     }
//
//     loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCSbxQeyVLBk8_cUUB52hILQKtP38QuFqg&libraries=places&region=sg', function () {
//       let places
//       let infoWindow
//       let autocomplete
//       let MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green'
//       let hostnameRegexp = new RegExp('^https?://.+?/')
//       let markers = []
//
//       console.log('self.refs.map', self.refs.map)
//
//       self.map = new google.maps.Map(self.refs.map, {
//         center: generalAssembly,
//         zoom: 12,
//         mapTypeId: 'roadmap'
//       })
//
//       if (savedLocation) {
//         self.map = new google.maps.Map(self.refs.map, {
//           center: savedLocation,
//           zoom: 12,
//           mapTypeId: 'roadmap'
//         })
//       }
//
//       let input = document.getElementById('pac-input')
//
//       infoWindow = new google.maps.InfoWindow({
//         content: document.getElementById('info-content')
//       })
//
//       autocomplete = new google.maps.places
//         .Autocomplete(document.getElementById('autocomplete'))
//       console.log('old autocomplete', autocomplete)
//
//       places = new google.maps.places.PlacesService(self.map)
//
//       autocomplete.addListener('place_changed', onPlaceChanged)
//
//       if (savedLocation) {
//         onLoad(savedLocation)
//       }
//
// //  document.getElementById('country').addEventListener(
// // 'change', setAutocompleteCountry);
//
//       function onLoad (savedLocation) {
//         let markers = []
//
//         if (savedLocation) {
//           markers.forEach(function (marker) {
//             console.log(marker)
//             marker.setMap(null)
//           })
//
//           let icon = {
//             url: 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/apartment-3.png?alt=media&token=f66902a1-7fc5-40a5-b038-b5cd915a5363',
//             size: new google.maps.Size(150, 150),
//             origin: new google.maps.Point(0, 0),
//             anchor: new google.maps.Point(17, 34),
//             scaledSize: new google.maps.Size(25, 25)
//           }
//
// // Create a marker for each place.
//           markers.push(new google.maps.Marker({
//             map: self.map,
//             icon: icon,
//             // title: place.name,
//             position: savedLocation
//           }))
//
//           console.log('markers', markers)
//
//           self.map.panTo(savedLocation)
//           self.map.setZoom(15)
//           savedSearch()
//         }
//       }
//
//       function savedSearch () {
//         let search = {
//         // bounds: self.map.getBounds(),
//           types: ['school', 'doctor', 'grocery_or_supermarket'],
//           location: savedLocation,
//           radius: 2000
//         }
//
//         console.log(places)
//
//         places.nearbySearch(search, function (results, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             clearResults()
//             clearMarkers()
// // Create a marker for each school found, and
// // assign a letter of the alphabetic to each marker icon.
//             for (var i = 0; i < results.length; i++) {
//               var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
//               var markerIcon = MARKER_PATH + markerLetter + '.png'
// // Use marker animation to drop the icons incrementally on the map.
//               markers[i] = new google.maps.Marker({
//                 position: results[i].geometry.location,
//                 animation: google.maps.Animation.DROP,
//                 icon: markerIcon
//               })
// // If the user clicks a school marker, show the details of that hotel
// // in an info window.
//               markers[i].placeResult = results[i]
//               google.maps.event.addListener(markers[i], 'click', showInfoWindow)
//               setTimeout(dropMarker(i), i * 100)
//               addResult(results[i], i)
//             }
//           }
//         })
//       }
//
//       function onPlaceChanged () {
//         let markers = []
//
//         console.log('after onPlaceChanged autocomplete', autocomplete)
//
//         let place = autocomplete.getPlace()
//         console.log('place.icon is', place.icon)
//         console.log('place.geometry.location is', place.geometry.location)
//
//         self.setState({
//           tempLat: place.geometry.location.lat(),
//           tempLong: place.geometry.location.lng()
//         })
//
//         console.log('self tempLat', self.state.tempLat)
//
//         console.log('set state liao')
//
//         if (place.geometry) {
//           markers.forEach(function (marker) {
//             console.log(marker)
//             marker.setMap(null)
//           })
//
//           console.log('markers', markers)
//
//           let icon = {
//             url: place.icon,
//             size: new google.maps.Size(71, 71),
//             origin: new google.maps.Point(0, 0),
//             anchor: new google.maps.Point(17, 34),
//             scaledSize: new google.maps.Size(25, 25)
//           }
//
// // Create a marker for each place.
//           markers.push(new google.maps.Marker({
//             map: self.map,
//             icon: icon,
//             title: place.name,
//             position: place.geometry.location
//           }))
//
//           console.log('markers', markers)
//
//           self.map.panTo(place.geometry.location)
//           self.map.setZoom(15)
//           search()
//         } else {
//           document.getElementById('autocomplete').placeholder = 'Search'
//         }
//       }
//
// // Search for schools in singapore, within the viewport of the map.
//       function search () {
//         let search = {
//           bounds: self.map.getBounds(),
//           types: ['school', 'doctor', 'grocery_or_supermarket']
//         }
//
//         console.log(places)
//
//         places.nearbySearch(search, function (results, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             clearResults()
//             clearMarkers()
// // Create a marker for each school found, and
// // assign a letter of the alphabetic to each marker icon.
//             for (var i = 0; i < results.length; i++) {
//               var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
//               var markerIcon = MARKER_PATH + markerLetter + '.png'
// // Use marker animation to drop the icons incrementally on the map.
//               markers[i] = new google.maps.Marker({
//                 position: results[i].geometry.location,
//                 animation: google.maps.Animation.DROP,
//                 icon: markerIcon
//               })
// // If the user clicks a school marker, show the details of that hotel
// // in an info window.
//               markers[i].placeResult = results[i]
//               google.maps.event.addListener(markers[i], 'click', showInfoWindow)
//               setTimeout(dropMarker(i), i * 100)
//               addResult(results[i], i)
//             }
//           }
//         })
//       }
//
//       function clearMarkers () {
//         for (var i = 0; i < markers.length; i++) {
//           if (markers[i]) {
//             markers[i].setMap(null)
//           }
//         }
//         markers = []
//       }
//
//       function dropMarker (i) {
//         return function () {
//           markers[i].setMap(self.map)
//         }
//       }
//
//       function addResult (result, i) {
//         let results = document.getElementById('results')
//         let markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26))
//         let markerIcon = MARKER_PATH + markerLetter + '.png'
//
//         let tr = document.createElement('tr')
//         tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF')
//         tr.onclick = function () {
//           google.maps.event.trigger(markers[i], 'click')
//         }
//
//         let iconTd = document.createElement('td')
//         let nameTd = document.createElement('td')
//         let icon = document.createElement('img')
//         icon.src = markerIcon
//         icon.setAttribute('class', 'placeIcon')
//         icon.setAttribute('className', 'placeIcon')
//         let name = document.createTextNode(result.name)
//         iconTd.appendChild(icon)
//         nameTd.appendChild(name)
//         tr.appendChild(iconTd)
//         tr.appendChild(nameTd)
//         results.appendChild(tr)
//       }
//
//       function clearResults () {
//         let results = document.getElementById('results')
//         while (results.childNodes[0]) {
//           results.removeChild(results.childNodes[0])
//         }
//       }
//
// // Get the place details for a school. Show the information in an info window,
// // anchored on the marker for the school that the user selected.
//       function showInfoWindow () {
//         console.log('infoWindow', infoWindow)
//         let marker = this
//         places.getDetails({placeId: marker.placeResult.place_id},
//         function (place, status) {
//           if (status !== google.maps.places.PlacesServiceStatus.OK) {
//             return
//           }
//           infoWindow.open(self.map, marker)
//           buildIWContent(place)
//         })
//       }
//
// // Load the place information into the HTML elements used by the info window.
//       function buildIWContent (place) {
//         document.getElementById('iw-icon').innerHTML = '<img class="schoolIcon" ' +
// 'src="' + place.icon + '"/>'
//         document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
// '">' + place.name + '</a></b>'
//         document.getElementById('iw-address').textContent = place.vicinity
//
//         if (place.formatted_phone_number) {
//           document.getElementById('iw-phone-row').style.display = ''
//           document.getElementById('iw-phone').textContent =
// place.formatted_phone_number
//         } else {
//           document.getElementById('iw-phone-row').style.display = 'none'
//         }
//
// // Rating for establishment
//         if (place.rating) {
//           var ratingHtml = ''
//           for (var i = 0; i < 5; i++) {
//             if (place.rating < (i + 0.5)) {
//               ratingHtml += '&#10025;'
//             } else {
//               ratingHtml += '&#10029;'
//             }
//             document.getElementById('iw-rating-row').style.display = ''
//             document.getElementById('iw-rating').innerHTML = ratingHtml
//           }
//         } else {
//           document.getElementById('iw-rating-row').style.display = 'none'
//         }
//
// // The regexp isolates the first part of the URL (domain plus subdomain)
// // to give a short URL for displaying in the info window.
//         if (place.website) {
//           var fullUrl = place.website
//           var website = hostnameRegexp.exec(place.website)
//           if (website === null) {
//             website = 'http://' + place.website + '/'
//             fullUrl = website
//           }
//           document.getElementById('iw-website-row').style.display = ''
//           document.getElementById('iw-website').textContent = website
//         } else {
//           document.getElementById('iw-website-row').style.display = 'none'
//         }
//       }
// // closing brackets for loadScript
//     })
//   }

// Render Map, search bar etc.

  render () {
    console.log('brochure location data', this.props.data)
    console.log('this.state.savedLat', this.state.savedLat)
    const saveButton = this.props.draft ? <button onClick={this.saveLocation}>SAVE</button> : ''
    return (

      <div>
        <Header icon='map' as='h2' content='Map of Surroundings' />

        <div id='locationField'>
          <input id='autocomplete' placeholder='Name of property' type='text' />
          {saveButton}
          {/* <button onClick={this.saveLocation}>SAVE</button> */}
        </div>

        <div style={{display: 'none'}}>
          <div id='info-content'>
            <table>
              <tr id='iw-url-row' className='iw_table_row'>
                <td id='iw-icon' className='iw_table_icon' />
                <td id='iw-url' />
              </tr>
              <tr id='iw-address-row' className='iw_table_row'>
                <td className='iw_attribute_name'>Address:</td>
                <td id='iw-address' />
              </tr>
              <tr id='iw-phone-row' className='iw_table_row'>
                <td className='iw_attribute_name'>Telephone:</td>
                <td id='iw-phone' />
              </tr>
              <tr id='iw-rating-row' className='iw_table_row'>
                <td className='iw_attribute_name'>Rating:</td>
                <td id='iw-rating' />
              </tr>
              <tr id='iw-website-row' className='iw_table_row'>
                <td className='iw_attribute_name'>Website:</td>
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
}

function loadScript (url, callback) {
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

export default ViewMap
