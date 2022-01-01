/**
 * config.js contains the application configuration data
 *
 * @module config
 */

/**
 * 'corsProxy' is the  proxy for requests to resolve CORS (cross-origin resource sharing)
 * error
 * @const {String}
 */
export const corsProxy = "";

/**
 * 'accuWeatherAPI' is the URL for AccuWeather API requests.
 * @const {String}
 */
export const accuWeatherAPI = "https://dataservice.accuweather.com/";

/**
 * 'accuWeatherKey' is the API key for AccuWeather API
 * If this project was for the general public, this API key would be stored on my own server
 * and that server would act as a proxy for all API requests in order to hide API key from
 * the public.
 * @const {String}
 */
export const accuWeatherKey = "BGeX6oJdTs1DM8FFmqB7tQRCyq04FmFg";

/**
 * 'accuWeatherIcons' is the URL where weather icon images are located.
 * @const {String}
 */
export const accuWeatherIcons =
  "https://developer.accuweather.com/sites/default/files/";

/**
 * 'accuWeatherSystems' is an object where the default and secondary systems (Imperial/Metric)
 * are assigned.
 * @const {Object}
 */
export const accuWeatherSystems = {
  default: "Imperial",
  secondary: "Metric",
};

/**
 * 'geoOptions' is an object that holds overrides to the default Geolocation config settings.
 * @const {Object}
 */
export const geoOptions = {
  enableHighAccuracy: true,
  timeout: 7000, // 7 seconds to retrieve location or call error handler
};

/**
 * 'myMemoryAPI' is the URL for MyMemory API requests (language translation API).
 * @const {String}
 */
export const myMemoryAPI = "https://api.mymemory.translated.net/get";

/**
 * 'translateLanguage' is an object that holds the default translation values like the languages
 * that populate the 'from' and 'to' HTML select boxes.
 *
 * @const {Object}
 */
export const translateLanguage = {
  from: "English",
  to: "Korean",
};
