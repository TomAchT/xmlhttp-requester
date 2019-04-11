/*
global Headers
*/

import {assertType, isNull, isNumber, isString, deepFreezeSeal, ArrayString} from 'flexio-jshelpers'

/**
 * @implements {ResponseDelegate}
 */
export class XmlHttpResponseDelegate {
  /**
   *
   * @param {?number} [code=null]
   * @param {?string} [body=null]
   * @param {?Map<string, (ArrayString|string)>} [headers=null]
   * @readonly
   */
  constructor(code = null, body = null, headers = null) {
    assertType(isNull(code) || isNumber(code), 'FetchResponseDelegate: `code` should be a number')
    assertType(isNull(body) || isString(body), 'FetchResponseDelegate: `body` should be a string')
    assertType(isNull(headers) || headers instanceof Map, 'FetchResponseDelegate: `headers` should be a Map')
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
    this.__body = body
    /**
     *
     * @type {?Map<string, (ArrayString|string)>}
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
  body() {
    return this.__body
  }

  /**
   *
   * @param {string} name
   * @return {?(string|ArrayString)}
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
