/**
 * base contains resuable data and functions that display information to the user's
 * browser screen.
 *
 * @module views/base
 */

/**
 * centralizes DOM identifier strings that are used multiple times
 *
 * @member {Object}
 */
export const elementStrings = {
    loaderPrefix: 'loader',
    navPrefix: 'nav',
};

/**
 * Decouple language translation from/to select string names. Used as 'computed keys'
 * in elements.translate below. Also, used in translateView.populateTranslateSelect().
 *
 * @member {Object}
 */
export const translateInputStrings = {
    from: 'from',
    to: 'to',
};

/**
 * All DOM elements that are initially in the DOM have their Object representations
 * prepared for reuse throughout this project under 'elements'
 *
 * @member {Object}
 */
export const elements = {
    navigation: {
        navContainer: document.querySelector(`.${elementStrings.navPrefix}`),
        navAll: document.querySelectorAll(`.${elementStrings.navPrefix}-link`),
    },
    mainContent: document.querySelector('.main-content'),
    weather: {
        content: document.querySelector('.main-content-accuweather'),
        details: document.querySelector('.accuweather-details'),
        error: document.querySelector('.accuweather-error'),
        switchSystem: document.querySelector('.switch-system-btn'),
        switchSystemLabel: document.querySelector('.switch-system-label'),
        location: document.querySelector('.location'),
        latLong: document.querySelector('.lat-long'),
        /*
        Below 'currentConditions' elements are treated as separate html elements because
        some have systems (Imperial/Metric) that are switchable and some do not. If all
        'currentConditions' were lumped together under a single element it would be
        inefficient to update values when switching systems that do not have to be updated.
        Also, the order in which they appear is important, so the application can't just
        lump all switchable elements under one element because then the application would
        be forced to display weather 'currentConditions' stats in a rigid and inflexible
        order (switchable elements lumped together).
        */
        currentConditions: {
            weatherText: document.querySelector('.weather-text'),
            weatherIcon: document.querySelector('.weather-icon'),
            temperature: document.querySelectorAll('.current-temp'),
            feelsLike: document.querySelector('.current-feels'),
            shadeTemp: document.querySelector('.current-shade'),
            twentyFourHigh: document.querySelector('.twenty-four-high'),
            twentyFourLow: document.querySelector('.twenty-four-low'),
            relativeHumidity: document.querySelector('.relative-humidity'),
            windSpeed: document.querySelector('.wind-speed'),
            uvIndex: document.querySelector('.uv-index'),
            visibility: document.querySelector('.visibility'),
            precipHour: document.querySelector('.precip-hour'),
            precip24: document.querySelector('.precip-24'),
            lastUpdate: document.querySelector('.last-update'),
        },
    },
    translate: {
        content: document.querySelector('.main-content-translate'),
        [translateInputStrings.from]: document.querySelector('.translate-from'),
        [translateInputStrings.to]: document.querySelector('.translate-to'),
        translateText: document.querySelector('.translate-text'),
        translateForm: document.querySelector('.translate-form'),
        translateResults: document.querySelector('.translate-results'),
        translateLoader: document.querySelector('.translate-loader'),
    },
};

/**
 * Reuse of loader functionality for both weather and language translation contexts.
 *
 * @param {Object} parent - the html element that will contain the loader
 * @param {String} type - either a loder for weather or language translation
 */
export const renderLoader = (parent, type) => {
    const loader = `
        <div class="${elementStrings.loaderPrefix}-${type}">
            <svg aria-hidden="true" viewBox="0 0 20 20">
                <path d="M19.315 10h-2.372v-0.205c-0.108-4.434-3.724-7.996-8.169-7.996-4.515 0-8.174 3.672-8.174 8.201s3.659 8.199 8.174 8.199c1.898 0 3.645-0.65 5.033-1.738l-1.406-1.504c-1.016 0.748-2.27 1.193-3.627 1.193-3.386 0-6.131-2.754-6.131-6.15s2.745-6.15 6.131-6.15c3.317 0 6.018 2.643 6.125 5.945v0.205h-2.672l3.494 3.894 3.594-3.894z" />
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

/**
 * Clear loader functionality centralized here.
 */
export const clearLoader = () => {
    // there could be more than one loader in the DOM
    const resultsArr = Array.from(document.querySelectorAll(`[class|="${elementStrings.loaderPrefix}"]`));
    resultsArr.forEach(el => {
        el.parentElement.removeChild(el);
    });
};

/**
 * Hide DOM element centralized.
 *
 * @param {Object} element - DOM element to hide
 */
export const hide = element => {
    element.style.display = 'none';
};

/**
 * Show DOM element centralized.
 *
 * @param {Object} element - DOM element to show
 */
export const show = element => {
    element.style.display = 'block';
};

/**
 * Update the active navigation link styling when user changes page content.
 *
 * @param {String} active - the navigation area to activate
 */
export const naviUpdate = active => {
    const resultsArr = Array.from(elements.navigation.navAll);
    resultsArr.forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(`.${elementStrings.navPrefix}-${active}`).classList.add('active');
};
