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

class App {
  #map;
  #mapEvent;
  constructor() {
    // triggering get position method
    this._getPosition();
    // when user press enter in a form
    form.addEventListener('submit', this._newWorkOut.bind(this));
    // to toggle between running and cycling
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // if geolocation api available
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert(' Could not get your position');
        }
      );
    // if location permission permitted
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coords = [latitude, longitude];

    // to set map view of user co-ordinate with zoom level = 13
    this.#map = L.map('map').setView(coords, 13);

    // tile layer of google maps
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.#map);

    // event listener on click
    this.#map.on('click', this._showForm.bind(this));
  }
  // if permission is denied

  _showForm(mapE) {
    this.#mapEvent = mapE;
    // to display the form when user clicks
    form.classList.remove('hidden');
    // to point cursor automatically on distance
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkOut(e) {
    // to avoid reloading of form
    e.preventDefault();

    //clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    //get co-ordinates
    const { lat, lng } = this.#mapEvent.latlng;

    // marker is rendered after form submission
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
