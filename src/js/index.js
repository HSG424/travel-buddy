/**
 * index.js is the application controller module: manages application flow by
 * interacting with APIs in the models directory (update application state), and
 * then passing relevant state data to the corresponding view (update GUI).
 *
 * @module index
 */
import "regenerator-runtime/runtime";
import Geolocation from "./models/Geolocation";
import Accuweather from "./models/Accuweather";
import Translate from "./models/Translate";
import * as geolocationView from "./views/geolocationView";
import * as accuweatherView from "./views/accuweatherView";
import * as translateView from "./views/translateView";
import * as base from "./views/base";

import { accuWeatherSystems } from "./config";

/**
 * Entire application state stored in JS Object 'state'
 *
 * @member {Object}
 */
const state = {};

/**
 * controlGeolocation() is an asynchronous function that creates a new Geolocation Class
 * in order to utilize the Geolocation API and get the user's latitude and longitude.
 * This location 'state' data is then passed to the geolocationView module which finally
 * displays latitude and longitude on the GUI.
 *
 * @async
 */
const controlGeolocation = async () => {
  state.geoLocation = new Geolocation();
  await state.geoLocation.latitudeLongitude();
  geolocationView.latLong(
    state.geoLocation.latitude,
    state.geoLocation.longitude
  );
};

/**
 * controlAccuweather() is an asynchronous function that creates a new Accuweather Class
 * which calls on some key endpoints in the Accuweather API to get a location key/id and
 * then current weather conditions. This current weather 'state' data is then passed to
 * the accuweatherView module which finally displays current weather info on the GUI.
 *
 * @async
 */
const controlAccuweather = async () => {
  state.accuWeather = new Accuweather(accuWeatherSystems);

  await state.accuWeather.geopositionSearchAPI(
    state.geoLocation.latitude,
    state.geoLocation.longitude
  );
  await state.accuWeather.currentConditionsAPI();

  accuweatherView.location(state.accuWeather.location);
  accuweatherView.currentConditions(
    state.accuWeather.currentConditions,
    state.accuWeather.system
  );
  accuweatherView.switchSystemsBtn(state.accuWeather.systemOpposite);

  base.show(base.elements.weather.details);
};

/**
 * currentWeatherConditions() is an asynchronous function that invokes both asynchronous
 * functions: controlGeolocation() AND controlAccuweather().
 * Current weather conditions and user location is displayed on the screen.
 *
 * @async
 */
const currentWeatherConditions = async () => {
  base.renderLoader(base.elements.weather.content, "weather");

  try {
    await controlGeolocation();
    await controlAccuweather();
  } catch (error) {
    const errorMsg = error.message ? error.message : error;
    accuweatherView.error(errorMsg);
    console.log(errorMsg);
  }
  base.clearLoader();
};

/** Event Listener: invoke currentWeatherConditions() when the page loads */
window.addEventListener("load", currentWeatherConditions);

/**
 * switchWeatherSystem() will switch the current weather conditions from the imperial system
 * to the metric system and vice versa.
 * Functions in the accuweatherView module are passed the current accuweather state data
 * to achieve switching systems.
 */
const switchWeatherSystem = () => {
  accuweatherView.currentConditionsSystemSwitchable(
    state.accuWeather.currentConditions,
    state.accuWeather.systemSwitch().system
  );
  accuweatherView.switchSystemsBtn(state.accuWeather.systemOpposite);
};

/** Event Listener: invoke switchWeatherSystem() when user CLICKS switch system button */
base.elements.weather.switchSystem.addEventListener(
  "click",
  switchWeatherSystem
);

/**
 * initializeTranslate() will create new object from Translate class/function constructor
 * and then populate the 'from' and 'to' language HTML select boxes with languages.
 */
const initializeTranslate = () => {
  state.translate = new Translate();
  translateView.populateFromTo(state.translate.languageCodes);
};

/**
 * controlTranslate() is an asynchronous function that retrieves the text to translate and
 * then invokes translateAPI() which consumes an endpoint in the MyMemory API.
 * The resulting translation is then displayed on the screen via the translateView module.
 *
 * @async
 */
const controlTranslate = async () => {
  const query = translateView.getInput();

  if (query.translateText) {
    base.hide(base.elements.translate.translateResults);
    base.renderLoader(base.elements.translate.translateLoader, "translate");

    try {
      await state.translate.translateAPI(query);
      translateView.renderResults(state.translate.translatedText);
    } catch (error) {
      translateView.error(error.message);
      console.log(error.message);
    }
    base.clearLoader();
    base.show(base.elements.translate.translateResults);
  }
};

/** Event Listener: invoke controlTranslate() when user submits the translation form. */
base.elements.translate.translateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlTranslate();
});

/**
 * switchContent() will switch the webpage content and then update which link in navigation
 * has the 'active' css state.
 *
 * @param {Object} hideElement - DOM Object to hide
 * @param {Object} showElement - DOM Object to show
 * @param {String} activeNavi - String represents which element in navigation to make 'active'
 */
const switchContent = (hideElement, showElement, activeNavi) => {
  base.hide(hideElement);
  base.show(showElement);
  base.naviUpdate(activeNavi);
};

/** Event Listener: when user CLICKS on the navigation area, use event delegation and
 * event.target.matches() to determine which navigation element was clicked and then invoke
 * switchContent() to load new page content.
 */
base.elements.navigation.navContainer.addEventListener("click", (event) => {
  if (event.target.matches(".nav-weather")) {
    switchContent(
      base.elements.translate.content,
      base.elements.weather.content,
      "weather"
    );
  } else if (event.target.matches(".nav-translate")) {
    if (!state.translate) initializeTranslate();
    switchContent(
      base.elements.weather.content,
      base.elements.translate.content,
      "translate"
    );
  }
});
