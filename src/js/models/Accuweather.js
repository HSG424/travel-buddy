/**
 * Accuweather module gets current weather conditions from the Accuweather API.
 *
 * @module models/Accuweather
 */
import axios from 'axios';
import {corsProxy, accuWeatherAPI, accuWeatherKey} from '../config';

/**
 * Accuweather class gets current weather conditions from the Accuweather API.
 */
export default class Accuweather {
    /**
     * Set the default system (Imperial/Metric) based on object in config.js
     *
     * @param {Object} accuWeatherSystems - default/secondary (Imperial or Metric)
     */
    constructor(accuWeatherSystems) {
        /**
         * '_weatherSystemConfig' is assigned the systems (Imperial or Metric) configuration
         * object from config.js
         * @member {Object}
         * @private
         */
        this._weatherSystemConfig = accuWeatherSystems;
        /**
         * '_system' is the currently selected system
         * @member {String}
         * @private
         */
        this._system = this._weatherSystemConfig.default;
    }

    /**
     * Getter method that will return location properties: city, state, and country.
     *
     * @return {Object}
     */
    get location() {
        return this._location;
    }

    /**
     * Getter method that will return current weather conditions.
     *
     * @return {Object} all the weather stats returned from AccuWeather API endpoint
     */
    get currentConditions() {
        return this._currentConditions;
    }

    /**
     * Getter method that will return the current system (Imperial/Metric)
     * for weather.
     *
     * @return {String}
     */
    get system() {
        return this._system;
    }

    /**
     * Getter method that will return the opposite system (Imperial/Metric) of
     * what is currently chosen. Used in multiple areas throughout application - provides
     * centralization of logic.
     *
     * @return {String}
     */
    get systemOpposite() {
        return this._system === this._weatherSystemConfig.default ? this._weatherSystemConfig.secondary : this._weatherSystemConfig.default;
    }

    /**
     * Switch the default system (Imperia) to secondary system (Metric) and vice versa.
     *
     * @return {Object} return 'this' object so index.js app controller can method chain
     */
    systemSwitch() {
        this._system = this.systemOpposite;
        return this;
    }

    /**
     * 'geopositionSearchAPI' will get the user's location key, city, state, and country
     * asynchronously from an AccuWeather API endpoint. Latitude and longitude are used as
     * inputs to this API request. After this method is invoked, the getter method location()
     * can then be used to return user location data.
     *
     * @async
     * @param {Number} latitude
     * @param {Number} longitude
     */
    async geopositionSearchAPI(latitude, longitude) {
        const result = await axios(`${corsProxy}${accuWeatherAPI}locations/v1/cities/geoposition/search?apikey=${accuWeatherKey}&q=${latitude}%2C${longitude}`);

        /**
         * '_location' object holds location key, city, state, and country properties
         * @member {Object}
         * @private
         */
        this._location = {
            key: result.data.Key,
            city: result.data.EnglishName,
            state: result.data.AdministrativeArea.EnglishName,
            country: result.data.Country.EnglishName,
        };
    }

    /**
     * 'currentConditionsAPI' will get the user's current weather data asynchronously from
     * an AccuWeather API endpoint. AccuWeather's 'location key' resulting from the 'geopositionSearchAPI'
     * endpoint is used as input to identify the location to use for current weather. After this method
     * is invoked, the getter method currentConditions() can then be used to return current conditions.
     *
     * @async
     */
    async currentConditionsAPI() {
        const result = await axios(`${corsProxy}${accuWeatherAPI}currentconditions/v1/${this._location.key}?apikey=${accuWeatherKey}&details=true `);

        /**
         * '_currentConditions' object holds current weather conditions
         * @member {Object}
         * @private
         */
        this._currentConditions = result.data[0];
    }
}
