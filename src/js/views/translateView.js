/**
 * translateView contains functionality to modify language translation
 * DOM Objects (GUI elements) and display translation state to the screen.
 *
 * @module views/translateView
 */
import {elements, translateInputStrings} from './base';
import {translateLanguage} from '../config';

/**
 * Populate both the 'from' and 'to' language HTML select boxes with all
 * the ISO lanuages.
 *
 * @param {Array} languageCodes
 */
export const populateFromTo = languageCodes => {
    populateTranslateSelect(languageCodes, translateInputStrings.from, translateLanguage.from);
    populateTranslateSelect(languageCodes, translateInputStrings.to, translateLanguage.to);
};

/**
 * Populate a single HTML select box with all the ISO languages.
 *
 * @private
 * @param {Array} languageCodes - all the languages
 * @param {String} type - either the 'from' or 'to' language
 * @param {String} selected - the language to be preselected
 */
const populateTranslateSelect = (languageCodes, type, selected='') => {
    elements.translate[type].innerHTML = languageCodes.map(language => `<option value="${language.code}" ${language.name === selected? 'selected' : ''}>${language.name}</option>` ).toString();
};

/**
 * Return values in the 'from' and 'to' language HTML select boxes along with
 * the text to translate.
 *
 * @return {Object}
 */
export const getInput = () => {
    return {
        translateText: encodeURIComponent(elements.translate.translateText.value),
        translateFrom: elements.translate[translateInputStrings.from].value,
        translateTo: elements.translate[translateInputStrings.to].value,
    };
};

/**
 * Display the resulting language translation on screen.
 *
 * @param {String} translatedText
 */
export const renderResults = translatedText => {
    elements.translate.translateResults.innerHTML = translatedText;
};

/**
 * Display translation error.
 *
 * @param {String} message
 */
export const error = message => {
    elements.translate.translateResults.innerHTML = `<span class="error">${message}</span>`;
};
