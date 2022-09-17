'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// if geolocation api available
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // if location permission permitted
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const coords = [latitude, longitude];

      // to set map view of user co-ordinate with zoom level = 13
      const map = L.map('map').setView(coords, 13);

      // tile layer of google maps
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      // event listener on click
      map.on('click', function (mapEvent) {
        // get co-ordinates
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeonClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    // if permission is denied
    function () {
      alert('Could not get your position');
    }
  );
}
