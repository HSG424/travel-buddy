/**
 * geolocationView contains functionality to modify geolocation DOM
 * Objects (GUI elements).
 *
 * @module views/geolocationView
 */
import {elements} from './base';

/**
 * Format and then display latitude/longitude as HTML on DOM element/object.
 *
 * @param {Number} latitude
 * @param {Number} longitude
 */
export const latLong = (latitude, longitude) => {
    elements.weather.latLong.innerHTML = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};
