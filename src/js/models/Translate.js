/**
 * Translate module gets translations from the MyMemory API (language translation).
 *
 * @module models/Translate
 */
import axios from "axios";

//import languageIsoCodes from "../../iso-codes/languages";

import languageIsoCodes from "../../iso-codes/languages";

import { corsProxy, myMemoryAPI } from "../config";

/**
 * Translate class gets translations from the MyMemory API (language translation)
 */
export default class Translate {
  /**
   * Initializes ISO standardized language codes from imported array.
   */
  constructor() {
    /**
     * '_languageCodes'will hold ISO standardized language codes from imported array.
     * @member {Array}
     * @private
     */
    this._languageCodes = languageIsoCodes;
  }

  /**
   * Getter method that will return ISO standardized language codes.
   *
   * @return {Array}
   */
  get languageCodes() {
    return this._languageCodes;
  }

  /**
   * Getter method that will return the translated text as a string.
   *
   * @return {String}
   */
  get translatedText() {
    return this._translatedText;
  }

  /**
   * 'translateAPI' will retrieve the language translation from a MyMemory API endpoint.
   * Inputs to the endpoint are the 'from' and 'to' languages along with the text to be
   * tranlsated. After this method is invoked, the getter method translatedText() can
   * then be used to return the translated text.
   *
   * @async
   * @param {Object} query
   */
  async translateAPI(query) {
    const result = await axios(
      `${corsProxy}${myMemoryAPI}?q=${query.translateText}&langpair=${query.translateFrom}|${query.translateTo}`
    );

    /**
     * '_translatedText' holds the translated text
     * @member {String}
     * @private
     */
    this._translatedText = result.data.responseData.translatedText;
  }
}
