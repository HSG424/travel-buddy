/**
 * accuweatherView contains functionality to modify weather related DOM
 * Objects (GUI elements) and display weather state to the screen.
 *
 * @module views/accuweatherView
 */
import {elements} from './base';
import {accuWeatherIcons} from '../config';

/**
 * Display the city, state and country that is returned by AccuWeather API
 * endpoint 'geoposition'
 *
 * @param {Object} location
 */
export const location = location => {
    elements.weather.location.innerHTML = `${location.city}, ${location.state}<br>${location.country}`;
};

/**
 * Switches the label in the switch system button from 'Imperial' to
 * 'Metric' and vice versa.
 *
 * @param {String} switchSystemLabel
 */
export const switchSystemsBtn = switchSystemLabel => {
    elements.weather.switchSystemLabel.innerHTML = switchSystemLabel;
};

/**
 * Accuweather and Geolocation (lat/long) errors occur on the same
 * page content area -- they will share the same error function.
 *
 * @param {message} message
 */
export const error = message => {
    if (!message) message = 'Geolocation/Accuweather General Error';
    elements.weather.error.innerHTML = message;
};

/**
 * Wraps together all the needed functions to display current weather
 * conditions to screen.
 *
 * @param {Object} currentConditions
 * @param {String} selectedSystem - Imperial/Metric
 */
export const currentConditions = (currentConditions, selectedSystem) => {
    weatherTextAndIcon(currentConditions);
    humidityAndUVIndex(currentConditions);
    lastUpdated(currentConditions);
    currentConditionsSystemSwitchable(currentConditions, selectedSystem);
};

/**
 * Wraps all the functions needed to display current weather condition
 * stats that can switch systems (Imperial/Metric).
 *
 * @param {Object} currentConditions
 * @param {String} selectedSystem - Imperial/Metric
 */
export const currentConditionsSystemSwitchable = (currentConditions, selectedSystem) => {
    temperatures(currentConditions, selectedSystem);
    windSpeedAndVisibility(currentConditions, selectedSystem);
    precipitation(currentConditions, selectedSystem);
};

/**
 * Display the weather text, image and alt text to screen.
 *
 * @private
 * @param {Object} currentConditions
 */
const weatherTextAndIcon = currentConditions => {
    elements.weather.currentConditions.weatherText.innerHTML = currentConditions.WeatherText;
    elements.weather.currentConditions.weatherIcon.src = `${accuWeatherIcons}${('0' + currentConditions.WeatherIcon).slice(-2)}-s.png`;
    elements.weather.currentConditions.weatherIcon.alt = currentConditions.WeatherText;
};

/**
 * Display the humidity and UV index.
 *
 * @private
 * @param {Object} currentConditions
 */
const humidityAndUVIndex = currentConditions => {
    elements.weather.currentConditions.relativeHumidity.innerHTML = `${currentConditions.RelativeHumidity}%`;
    elements.weather.currentConditions.uvIndex.innerHTML = `${currentConditions.UVIndex} (${currentConditions.UVIndexText})`;
};

/**
 * Display the last time AccuWeather updated the current weather stats.
 *
 * @private
 * @param {Object} currentConditions
 */
const lastUpdated = currentConditions => {
    elements.weather.currentConditions.lastUpdate.innerHTML = new Date(currentConditions.EpochTime * 1000).toLocaleString();
};

/**
 * Different types of temperature stats for current conditions.
 * The system (Imperial/Metric) is switchable.
 *
 * @private
 * @param {Object} currentConditions
 * @param {String} selectedSystem - Imperial/Metric
 */
const temperatures = (currentConditions, selectedSystem) => {
    const htmlDegrees = '&#176;';

    // 2 elements in DOM where we have to update current temperature
    const currentTempString = `${currentConditions.Temperature[selectedSystem].Value}${htmlDegrees}${currentConditions.Temperature[selectedSystem].Unit}`;
    Array.from(elements.weather.currentConditions.temperature).forEach(el => {
        el.innerHTML = currentTempString;
    });

    elements.weather.currentConditions.feelsLike.innerHTML = `${currentConditions.RealFeelTemperature[selectedSystem].Value} ${htmlDegrees}${currentConditions.RealFeelTemperature[selectedSystem].Unit}`;
    elements.weather.currentConditions.shadeTemp.innerHTML = `${currentConditions.RealFeelTemperatureShade[selectedSystem].Value} ${htmlDegrees}${currentConditions.RealFeelTemperatureShade[selectedSystem].Unit}`;

    elements.weather.currentConditions.twentyFourHigh.innerHTML = `${currentConditions.TemperatureSummary.Past24HourRange.Maximum[selectedSystem].Value} ${htmlDegrees}${currentConditions.TemperatureSummary.Past24HourRange.Maximum[selectedSystem].Unit}`;
    elements.weather.currentConditions.twentyFourLow.innerHTML = `${currentConditions.TemperatureSummary.Past24HourRange.Minimum[selectedSystem].Value} ${htmlDegrees}${currentConditions.TemperatureSummary.Past24HourRange.Minimum[selectedSystem].Unit}`;
};

/**
 * Wind speed and visibility stats for current conditions.
 * The system (Imperial/Metric) is switchable.
 *
 * @private
 * @param {Object} currentConditions
 * @param {String} selectedSystem - Imperial/Metric
 */
const windSpeedAndVisibility = (currentConditions, selectedSystem) => {
    elements.weather.currentConditions.windSpeed.innerHTML = `${currentConditions.Wind.Speed[selectedSystem].Value} ${currentConditions.Wind.Speed[selectedSystem].Unit}`;
    elements.weather.currentConditions.visibility.innerHTML = `${currentConditions.Visibility[selectedSystem].Value} ${currentConditions.Visibility[selectedSystem].Unit}`;
};

/**
 * Precipitation stats for current conditions.
 * The system (Imperial/Metric) is switchable.
 *
 * @private
 * @param {Object} currentConditions
 * @param {String} selectedSystem - Imperial/Metric
 */
const precipitation = (currentConditions, selectedSystem) => {
    elements.weather.currentConditions.precipHour.innerHTML = `${currentConditions.PrecipitationSummary.PastHour[selectedSystem].Value} ${currentConditions.PrecipitationSummary.PastHour[selectedSystem].Unit}`;
    elements.weather.currentConditions.precip24.innerHTML = `${currentConditions.PrecipitationSummary.Past24Hours[selectedSystem].Value} ${currentConditions.PrecipitationSummary.Past24Hours[selectedSystem].Unit}`;
};

