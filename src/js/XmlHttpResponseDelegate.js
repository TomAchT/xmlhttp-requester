/*
global Headers
*/

import {assertType, isNull, isNumber, isString, deepFreezeSeal, StringArray} from 'flexio-jshelpers'

/**
 * @implements {ResponseDelegate}
 */
export class XmlHttpResponseDelegate {
  /**
   *
   * @param {?number} [code=null]
   * @param {?string} [payload=null]
   * @param {?Map<string, (StringArray|string)>} [headers=null]
   * @readonly
   */
  constructor(code = null, payload = null, headers = null) {
    assertType(isNull(code) || isNumber(code), 'XmlHttpResponseDelegate: `code` should be a number')
    assertType(isNull(payload) || isString(payload), 'XmlHttpResponseDelegate: `payload` should be a string')
    assertType(isNull(headers) || headers instanceof Map, 'XmlHttpResponseDelegate: `headers` should be a Map')
    /**
     *
     * @type {?number}
     * @private
     */
    this.__code = code
    /**
     *
     * @type {?string}
     * @private
     */
    this.__payload = payload
    /**
     *
     * @type {?Map<string, (StringArray|string)>}
     * @private
     */
    this.__headers = headers

    return deepFreezeSeal(this)
  }

  /**
   * @return {?number}
   */
  code() {
    return this.__code
  }

  /**
   * @return {?string}
   */
  payload() {
    return this.__payload
  }

  /**
   *
   * @param {string} name
   * @return {?(string|StringArray)}
   */
  header(name) {
    return this.__headers.get(name)
  }

  /**
   *
   * @return {?string}
   */
  contentType() {
    return this.header('content-type')
  }
}
