/**
 * Geolocation module finds the latitude and longitude of the user via the Geolocation API.
 *
 * @module models/Geolocation
 */
import {geoOptions as _geoOptions} from '../config';

/** Geolocation class uses the Geolocation API to get user latitude and longitude */
export default class Geolocation {
    /**
     * Getter method that will return latitude.
     *
     * @return {Number}
     */
    get latitude() {
        return this._latitude;
    }

    /**
     * Getter method that will return longitude.
     *
     * @return {Number}
     */
    get longitude() {
        return this._longitude;
    }

    /**
     * 'latitudeLongitude' will set latitude and longitude properties asynchronously via
     * '_latitudeLongitudePromise()' and the Geolocation API. After this method is invoked,
     * the getter methods latitude()/longitude() can then be used to return latitude and longitude.
     *
     * @async
     */
    async latitudeLongitude() {
        [this._latitude, this._longitude] = await this._latitudeLongitudePromise();
    }

    /**
     * _latitudeLongitudePromise is a private method that returns a Promise object which will
     * either 'resolve' to an array of latitude and longitude OR a specific error message (reject).
     * Geolocation API implementation details are found here -- getCurrentPosition()
     *
     * @private
     * @return {Promise} Promise object representing latitude and longitude
     */
    _latitudeLongitudePromise() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Geolocation is not supported by your browser');
            } else {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve([position.coords.latitude, position.coords.longitude]);
                    },
                    error => {
                        reject(error.message);
                    },
                    _geoOptions
                );
            }
        });
    }
}
